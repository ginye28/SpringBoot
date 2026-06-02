package com.korit.ch03.controller.product.dto;

import lombok.Data;

@Data
public class ProductReqCreate {
    private String productName;
    private Long categoryId;
    private int price;
}
