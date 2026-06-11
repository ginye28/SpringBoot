package com.korit.todoapi.security;

import com.nimbusds.oauth2.sdk.auth.Secret;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtil {
//    jwt = 변수명
    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.secret}") // 1
    private String secret;

    @Value("${jwt.accessTokenTtlSeconds}")
    private long accessTokenTtlSeconds;

//    private Key key; 업캐스팅이 되어서 같은 것
    private SecretKey key;

    @PostConstruct  // 2
    void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));      //keys 사용엔 jjwt 필요함(build.gradle)  jwt. setter를 통해서 주입
        // 생성이 되고 나서 후처리(생성) 후처리가 안 되면 null값이 들어가게 됨
    }

    // parameter에도 생성할 수 있음 (1 + 2)
//    public JwtUtil(@Value("${jwt.secret}") String secret) {
//        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//    }

    public String createToken(Long userId) {
        Instant instant = Instant.now();

        return Jwts.builder()   //builder가 compact가 되면 키가 생성 됨
                .issuer(issuer)
                .subject(String.valueOf(userId))    //subject에 id, claim 등이 들어갈 수 있음
                .issuedAt(Date.from(instant))
                .expiration(Date.from(instant.plusSeconds(accessTokenTtlSeconds)))   // 만료 시간을 꼭 넣어줘야 함 (new Date(new Date().getTime() + (60000l * 60l * 24l * 30l * 12l))) 지금으로부터 1년이라는 시간도 잡아줄 수 있음
                .signWith(key, Jwts.SIG.HS512)  //(보안 키 수)
                .compact();
    }

    public Jws<Claims> parseAndValidate(String jwt) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(jwt);
    }
//    public Jws<Claims> parseAndValidate(String token) {
//        return Jwts.parser()
//                .verifyWith(key)
//                .build()
//                .parseSignedClaims(token);
//    }


}
