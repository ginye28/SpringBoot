package com.korit.todoapi.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/categories")
public class CategoryController {

    @GetMapping
    public ResponseEntity<?> get() {    // @AuthenticationPrincipal Long userId 줄일 수 있음 밑줄은 주석 (princialUser로 꺼내올 수 있음)
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //userId 전역

        return ResponseEntity.ok("카테고리 가지고 나감, userId: " + userId);
    }
    // static x
}
