package com.korit.ch03.controller.role;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.controller.role.dto.RoleReqCreate;
import com.korit.ch03.controller.role.dto.RoleResp;
import com.korit.ch03.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/roles")   //3
@RestController //2
@RequiredArgsConstructor    //12
public class RoleController {   //1
    private final RoleService roleService;  //11

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody RoleReqCreate dto) {
        roleService.create(dto);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResp>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(roleService.getAll()));
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleResp>> getOne(@PathVariable Long roleId) {
        return ResponseEntity.ok(ApiResponse.ok(roleService.getOne(roleId)));
    }
}
