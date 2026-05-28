package com.korit.ch02.service;

public class SmsSender implements MessageSender {

    @Override
    public void send(String to, String message) {
        System.out.println("[EMAIL] " + to + " : " + message);
    }
}
