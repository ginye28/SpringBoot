package com.korit.ch02.component;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class CacheManager {

    private final Map<String, String> cache = new HashMap<>();

    // 여기에 초기화 메서드 작성
    @Bean

    // 여기에 소멸 메서드 작성
    @Bean

    public String get(String key) {
        // 구현
    }
}
