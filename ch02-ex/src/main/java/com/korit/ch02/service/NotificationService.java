package com.korit.ch02.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// 이 서비스에 MessageSender를 주입해야 합니다
public class NotificationService {
    private final MessageSender messageSender;

    // 생성자 직접 작성
    public NotificationService(MessageSender messageSender) {
        this.messageSender = messageSender;
    }
}
