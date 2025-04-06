package com.upm.resumenes.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "valoraciones")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Valoracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private boolean isFree;

    @Column(nullable = false)
    private String filePath;

    @ManyToOne
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;
}
