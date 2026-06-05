package com.korit.ch04api.service;

import com.korit.ch04api.dto.AuthUserTokenRequest;
import com.korit.ch04api.entity.User;
import com.korit.ch04api.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public String authenticate(AuthUserTokenRequest dto) {
        User foundUser = userMapper.selectByUsername(dto.getUsername());
        if (foundUser == null) {
            throw new UsernameNotFoundException("인증 실패, 로그인 정보를 다시 확인하세요.");
        }
        if (!passwordEncoder.matches(dto.getPassword(), foundUser.getPassword())) {
            throw new CredentialsExpiredException("인증 실패, 로그인 정보를 다시 확인하세요.");
        }
        return "생성된 토큰";
    }
}
