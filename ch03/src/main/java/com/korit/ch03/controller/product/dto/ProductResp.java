package com.korit.ch03.controller.product.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ProductResp {
    private Long id;
    private String productName;
    private int price;
    private Long categoryId;
    private String categoryName;
    private LocalDateTime createdAt;
}
