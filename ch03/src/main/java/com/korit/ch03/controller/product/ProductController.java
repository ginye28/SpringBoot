package com.korit.ch03.controller.product;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.controller.product.dto.ProductReqCreate;
import com.korit.ch03.controller.product.dto.ProductResp;
import com.korit.ch03.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/products")
@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody ProductReqCreate dto) {
        productService.create(dto);
        return ResponseEntity.ok(ApiResponse.ok());
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResp>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(productService.getAll()));
    }
    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductResp>> getOne(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getOne(productId)));
    }
}
