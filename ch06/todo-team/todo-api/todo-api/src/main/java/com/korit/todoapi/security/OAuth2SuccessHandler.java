package com.korit.todoapi.security;

import com.korit.todoapi.entity.User;
import com.korit.todoapi.mapper.UserMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User auth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("1234");
        User user = userMapper.selectByProviderId(auth2User.getAttribute("providerId"));
        if (user == null) {
            user = User.builder()
                    .email(auth2User.getAttribute("email"))
                    .nickname(auth2User.getAttribute("name"))
                    .provider(auth2User.getAttribute("provider"))
                    .providerId(auth2User.getAttribute("providerId"))
                    .build();
            userMapper.insert(user);
        }
        String accessToken = jwtUtil.createToken(user.getId());

        String target = UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("accessToken", accessToken)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
