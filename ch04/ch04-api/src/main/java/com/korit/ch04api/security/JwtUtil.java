package com.korit.ch04api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.time.Instant;

@Component
public class JwtUtil {

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.accessTokenTtlSeconds}")
    private long accessTokenTtlSeconds; //TTL(Time To Live)은 주로 네트워크 및 컴퓨터 분야에서 사용되는 용어로, 데이터가 네트워크 상에서 패킷이 살아있을 수 있는 시간 또는 DNS 캐시가 유지되는 시간(초)을 의미합니다

    private SecretKey key;

    @PostConstruct
    void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(Long userId) {
        Instant instant = Instant.now();
        return Jwts.builder()
                .issuer(issuer)
                .subject(String.valueOf(userId))
                .issuedAt(Date.from(instant))
                .expiration(Date.from(instant.plusSeconds(accessTokenTtlSeconds)))
                .signWith(key, Jwts.SIG.HS512)
                .compact();
    }

    public Jws<Claims> parseAndValidate(String jwt) {
        return Jwts.parser()
                .verifyWith(key)    //secret key
                .build()
                .parseSignedClaims(jwt);
    }
}
