package com.korit.ch04api.security;

import com.korit.ch04api.common.Exception.DuplicatedException;
import com.korit.ch04api.dto.AuthUserCreateRequest;
import com.korit.ch04api.dto.CreateResponse;
import com.korit.ch04api.entity.User;
import com.korit.ch04api.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public CreateResponse authCreate(AuthUserCreateRequest dto) {
        User foundUser = userMapper.selectByUsername(dto.getUsername());
        if (foundUser != null) {
            throw new DuplicatedException("username 필드 중복", "username", dto.getUsername());
        }

        User userEntity = dto.toUser();
        userMapper.insert(userEntity);

        return CreateResponse.builder()
                .domainName("user")
                .createdIds(List.of(userEntity.getId()))
                .build();
    }

//    public void signUp(AuthUserCreateRequest dto) {
//        User foundUser = userMapper.selectByUsername(dto.getUsername());
//        if (foundUser != null) {
//            return ;
//        }
//        User newUser = User.builder()
//                .username(dto.getUsername())
//                .password(dto.getPassword())
//                .name(dto.getName())
//                .email(dto.getEmail())
//                .build();
//        UserMapper.insert(newUser);
//    }
}
