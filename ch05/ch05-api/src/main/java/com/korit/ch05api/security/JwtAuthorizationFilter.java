package com.korit.ch05api.security;

import com.korit.ch05api.entity.User;
import com.korit.ch05api.mapper.UserMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        if (token != null) {
            try {
                Jws<Claims> claimsJws = jwtUtil.parseAndValidate(token);
                Long userId = Long.valueOf(claimsJws.getPayload().getSubject());

                User foundUser = userMapper.selectById(userId);
                PrincipalUser principalUser = new PrincipalUser(foundUser, null);

                UsernamePasswordAuthenticationToken authenticationToken
                        = new UsernamePasswordAuthenticationToken(principalUser, "", principalUser.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } catch (JwtException e) {
                e.printStackTrace();
            }
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null) {
            return null;
        }
        if (!header.startsWith("Bearer ")) {    //Bearer - JWT 에쎄스 토큰
            return null;                        //"Bearer " index라서 띄어쓰기 해줌
        }
        return header.substring("Bearer ".length());
    }
}
