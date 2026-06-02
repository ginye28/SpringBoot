package com.korit.ch03.controller.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResp {
    private Long id;
    private String categoryName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
