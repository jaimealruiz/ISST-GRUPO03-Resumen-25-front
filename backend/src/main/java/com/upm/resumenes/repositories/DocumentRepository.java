package com.upm.resumenes.repositories;

import com.upm.resumenes.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    //Devuelve lista de los que son gratis
    List<Document> findByIsFreeTrue();
}
