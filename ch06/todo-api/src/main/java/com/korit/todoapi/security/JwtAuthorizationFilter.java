package com.korit.todoapi.security;

import com.korit.todoapi.entity.User;
import com.korit.todoapi.mapper.UserMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);

        if(token != null) {
            try {
                Jws<Claims> claimsJws = jwtUtil.parseAndValidate(token);    //parser의 return이 jws
                Long userId = Long.valueOf(claimsJws.getPayload().getSubject());    // payload는 토근이 담겨있는 곳(jwt.io)

                User foundUser = userMapper.selectById(userId);
                PrincipalUser principalUser = new PrincipalUser(foundUser, null);

                UsernamePasswordAuthenticationToken authenticationToken
                        = new UsernamePasswordAuthenticationToken(principalUser, "", principalUser.getAuthorities()); //List.of(new SimpleGrantedAuthority("ROLE_USER")) 권한

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } catch (JwtException e) {
                e.printStackTrace();
            }
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if(header == null) {
            return null;
        }
        if(!header.startsWith("Bearer ")) {
            return null;
        }
        return header.substring("Bearer ".length());
    }
}
