package com.upm.resumenes.serviciesImpl;

import com.upm.resumenes.entities.*;
import com.upm.resumenes.repositories.DocumentRepository;
import com.upm.resumenes.servicies.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final String UPLOAD_DIR = "C:\\Users\\Javier\\Desktop\\resumenes\\resumenes_back\\uploads";


    @Autowired
    private DocumentRepository documentRepository;


    @Override
    public Document uploadDocument(String title, String description, boolean isFree, MultipartFile file,
            User uploadedBy) {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File uploadFolder = new File(UPLOAD_DIR);

        // Crear la carpeta si no existe
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        String filePath = UPLOAD_DIR + File.separator + fileName;

        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo: " + e.getMessage());
        }

        Document doc = new Document();
        doc.setTitle(title);
        doc.setDescription(description);
        doc.setFree(isFree);
        doc.setFilePath(filePath);
        doc.setUploadedBy(uploadedBy);

        return documentRepository.save(doc);
    }

    @Override
    public List<Document> getFreeDocuments() {
        return documentRepository.findByIsFreeTrue();
    }

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @Override
    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }
}
