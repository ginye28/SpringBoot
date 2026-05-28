package com.korit.ch02.config;

import com.korit.ch02.service.EmailSender;
import com.korit.ch02.service.MessageSender;
import com.korit.ch02.service.NotificationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Service
@Configuration
public class AppConfig {

    @Bean
    public MessageSender messageSender() {
        return new EmailSender();
    }

    @Bean
    public NotificationService notificationService() {
        return new NotificationService(messageSender());
    }
}
