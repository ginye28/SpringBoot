package com.korit.todoapi.security;

import java.util.Map;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    String getProfileImage();

    default Map<String, Object> getAttribute() {
        return Map.of(
                "providerId", getProviderId(),
                "provider", getProvider(),
                "email", getEmail(),
                "name", getName(),
                "profileImage", getProfileImage()
        );
    }
}
