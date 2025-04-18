package com.upm.resumenes.controllers;

import com.upm.resumenes.entities.Document;
import com.upm.resumenes.entities.User;
import com.upm.resumenes.servicies.DocumentService;
import com.upm.resumenes.servicies.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
//Pasar origen a que se maneje desde un proppieties
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
        if (userId == null)
            throw new RuntimeException("Acceso denegado: no estás logueado.");
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
        if (userId == null)
            throw new RuntimeException("No estás logueado");

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!user.isWriter()) {
            throw new RuntimeException("No tienes permisos para subir documentos");
        }

        return documentService.uploadDocument(title, description, isFree, file, user);
    }

    //Devuelve el pdf, 
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id) {
        Optional<Document> docOpt = documentService.getDocumentById(id);
        if (docOpt.isEmpty())
            throw new RuntimeException("Documento no encontrado");
    
        Document doc = docOpt.get();
        try {
            String filePath = doc.getFilePath();
    
            Resource resource;
    
            if (filePath.startsWith("http")) {
                // Si es URL externa
                resource = new UrlResource(filePath);
            } else {
                // Si es archivo local
                String fileName = new java.io.File(filePath).getName();
                Path path = Paths.get("uploads").resolve(fileName).normalize();
                resource = new UrlResource(path.toUri());
            }
    
            if (!resource.exists())
                throw new RuntimeException("Archivo no encontrado");
    
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header("X-Frame-Options", "ALLOWALL")
                    .body(resource);
    
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
