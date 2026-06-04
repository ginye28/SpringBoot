package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserCreateRequest;
import com.korit.ch04api.security.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ApiResponse> signUp(@RequestBody AuthUserCreateRequest dto) {
        UserService.signUp(dto);
        return ResponseEntity.ok(ApiResponse.success());
    }

}
