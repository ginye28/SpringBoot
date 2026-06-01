package com.korit.ch03.service;

import com.korit.ch03.common.exception.DuplicatedException;
import com.korit.ch03.controller.role.dto.RoleReqCreate;
import com.korit.ch03.controller.role.dto.RoleResp;
import com.korit.ch03.entity.Role;
import com.korit.ch03.mapper.RoleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service    //5
@RequiredArgsConstructor    //10
public class RoleService {  //4
    private final RoleMapper roleMapper;    //9

    public RoleResp create(RoleReqCreate dto) {
        Role foundRole = roleMapper.selectByRolename(dto.getRoleName());
        if (foundRole != null) {
            throw new DuplicatedException("roleName이 중복입니다.", "roleName", dto.getRoleName());
        }
        Role newRole = Role.builder().roleName(dto.getRoleName()).build();
        roleMapper.insert(newRole);

        return RoleResp.builder()
                .id(newRole.getId())
                .roleName(newRole.getRoleName())
                .createdAt(newRole.getCreatedAt())
                .updatedAt(newRole.getUpdatedAt())
                .build();
    }

    public List<RoleResp> getAll() {
        List<Role> roles = roleMapper.selectAll();
        return roles.stream()
                .map(role -> RoleResp.builder()
                    .id(role.getId())
                    .roleName(role.getRoleName())
                    .createdAt(role.getCreatedAt())
                    .updatedAt(role.getUpdatedAt())
                    .build())
                .toList();
    }
    public RoleResp getOne(Long roleId) {
        Role role = roleMapper.selectById(roleId);
        return RoleResp.builder()
                .id(role.getId())
                .roleName(role.getRoleName())
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }
}
