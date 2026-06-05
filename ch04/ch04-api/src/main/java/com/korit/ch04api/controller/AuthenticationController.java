package com.korit.ch04api.controller;

import com.korit.ch04api.dto.*;
import com.korit.ch04api.service.AuthenticationService;
import com.korit.ch04api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<CreateResponse>> signUp(@Valid @RequestBody AuthUserCreateRequest dto) {
        return ResponseEntity.ok(ApiResponse.success(userService.authCreate(dto)));
    }

    @PostMapping("/users/token")
    public ResponseEntity<ApiResponse<TokenResponse>> signIn(@Valid @RequestBody AuthUserTokenRequest dto) {
        return ResponseEntity.ok(ApiResponse.success(authenticationService.authenticate(dto)));
    }

}
