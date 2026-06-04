package com.korit.ch04api.common.ExceptionController;

import com.korit.ch04api.common.Exception.DuplicatedException;
import com.korit.ch04api.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicatedException.class)
    public ResponseEntity<ApiResponse<DuplicatedException>> duplicated(DuplicatedException e) {
        return ResponseEntity.badRequest().body(ApiResponse.fail(e));
    }
}
