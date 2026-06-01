package com.korit.ch03.controller.user;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.controller.user.dto.UserReqCreate;
import com.korit.ch03.controller.user.dto.UserResp;
import com.korit.ch03.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResp>> create(@RequestBody UserReqCreate dto) {
        UserResp userResp = userService.create(dto);

        if (userResp == null) {
            return ResponseEntity.badRequest().body(ApiResponse.fail("이미 존재하는 사용자 이름입니다."));
        }
        return ResponseEntity.ok(ApiResponse.ok(userResp));
    }

    // 다건(전체)
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResp>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(userService.getAll()));
    }

    //단건
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResp>> getOne(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getOne(userId)));
    }
}
