package com.korit.ch05api.security;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User auth2User = super.loadUser(userRequest);
        System.out.println(auth2User.getAttributes());
        System.out.println(userRequest.getClientRegistration().getClientName());


        return switch (userRequest.getClientRegistration().getClientName()) {
            case "Google" -> new PrincipalUser(null, new GoogleUserInfo(auth2User.getAttributes()));
            case "Naver" -> new PrincipalUser(null, new NaverUserInfo(auth2User.getAttributes()));
            case "Kakao" -> new PrincipalUser(null, new KakaoUserInfo(auth2User.getAttributes()));
            default ->
                    throw new IllegalStateException("지원하지 않는 제공자");
        };
    }
}
