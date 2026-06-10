package com.korit.todoapi.security;

import com.korit.todoapi.entity.User;
import lombok.Data;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Data
public class PrincipalUser implements UserDetails, OAuth2User {
    private User user;
    private OAuth2UserInfo oAuth2UserInfo;

    public PrincipalUser(User user, OAuth2UserInfo oAuth2UserInfo) {
        this.user = user;
        this.oAuth2UserInfo = oAuth2UserInfo;
    }

    @Override
    public String getName() {
        return oAuth2UserInfo.getEmail();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2UserInfo.getAttribute();
    }
}
