package com.korit.ch03.service;

import com.korit.ch03.common.exception.DuplicatedException;
import com.korit.ch03.controller.product.dto.ProductReqCreate;
import com.korit.ch03.controller.product.dto.ProductResp;
import com.korit.ch03.entity.Product;
import com.korit.ch03.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductMapper productMapper;

    public void create(ProductReqCreate dto) {
        Product foundProduct = productMapper.selectByProductName(dto.getProductName());
        if (foundProduct != null) {
            throw new DuplicatedException("상품명이 이미 존재합니다." ,"productName", dto.getProductName());
        }
        Product newProduct = Product.builder()
                .productName(dto.getProductName())
                .price(dto.getPrice())
                .categoryId(dto.getCategoryId())
                .build();
        productMapper.insert(newProduct);
    }

    public List<ProductResp> getAll() {
        return productMapper.selectAll().stream()
                .map(product -> ProductResp.builder()
                        .id(product.getId())
                        .productName(product.getProductName())
                        .price(product.getPrice())
                        .categoryId(product.getCategoryId())
                        .categoryName(product.getCategory().getCategoryName())
                        .createdAt(product.getCreatedAt())
                        .build())
                .toList();
    }

    public ProductResp getOne(Long productId) {
        Product foundProduct = productMapper.selectById(productId);
        return ProductResp.builder()
            .id(foundProduct.getId())
            .productName(foundProduct.getProductName())
            .price(foundProduct.getPrice())
            .categoryId(foundProduct.getCategoryId())
            .categoryName(foundProduct.getProductName())
            .createdAt(foundProduct.getCreatedAt())
            .build();
    }
}
