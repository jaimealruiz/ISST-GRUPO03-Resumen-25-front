package com.upm.resumenes.controllers;

import com.upm.resumenes.entities.Document;
import com.upm.resumenes.entities.User;
import com.upm.resumenes.servicies.DocumentService;
import com.upm.resumenes.servicies.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserService userService;

    @GetMapping("/free")
    public List<Document> getFreeDocuments() {
        return documentService.getFreeDocuments();
    }

    @GetMapping("/all")
    public List<Document> getAllDocuments(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("Acceso denegado: no estás logueado.");
        }
        return documentService.getAllDocuments();
    }

    @PostMapping("/upload")
    public Document uploadDocument(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("isFree") boolean isFree,
            @RequestParam("file") MultipartFile file,
            HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("No estás logueado");
        }

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!user.isWriter()) {
            throw new RuntimeException("No tienes permisos para subir documentos");
        }

        return documentService.uploadDocument(title, description, isFree, file, user);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id) {
        Optional<Document> docOpt = documentService.getDocumentById(id);
        if (docOpt.isEmpty()) {
            throw new RuntimeException("Documento no encontrado");
        }

        Document doc = docOpt.get();
        String filePath = doc.getFilePath();
        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_PDF);
            responseHeaders.add("X-Frame-Options", "ALLOWALL");

            if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
                // Descargar desde URL externa y servir bytes
                HttpHeaders requestHeaders = new HttpHeaders();
                requestHeaders.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_PDF_VALUE);
                HttpEntity<Void> requestEntity = new HttpEntity<>(requestHeaders);

                ResponseEntity<byte[]> resp = restTemplate.exchange(
                        filePath,
                        HttpMethod.GET,
                        requestEntity,
                        byte[].class
                );
                if (!resp.getStatusCode().is2xxSuccessful() || resp.getBody() == null) {
                    throw new RuntimeException("No se pudo descargar el PDF externo, status=" + resp.getStatusCode());
                }
                ByteArrayResource bar = new ByteArrayResource(resp.getBody());
                return ResponseEntity.ok()
                        .headers(responseHeaders)
                        .contentLength(resp.getBody().length)
                        .body(bar);
            } else {
                // Servir archivo local
                String fileName = new java.io.File(filePath).getName();
                Path path = Paths.get("uploads").resolve(fileName).normalize();
                UrlResource resource = new UrlResource(path.toUri());
                if (!resource.exists()) {
                    throw new RuntimeException("Archivo no encontrado");
                }
                return ResponseEntity.ok()
                        .headers(responseHeaders)
                        .contentLength(resource.contentLength())
                        .body(resource);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al servir el archivo PDF", e);
        }
    }

    @GetMapping("/{id}")
    public Document getById(@PathVariable Long id) {
        return documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Resumen no encontrado"));
    }
}
