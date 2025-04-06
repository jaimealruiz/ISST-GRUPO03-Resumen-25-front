package com.upm.resumenes.servicies;


import com.upm.resumenes.entities.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface DocumentService {
    Document uploadDocument(String title, String description, boolean isFree, MultipartFile file, User uploadedBy);
    List<Document> getFreeDocuments();
    List<Document> getAllDocuments();
    Optional<Document> getDocumentById(Long id);
}

