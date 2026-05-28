package com.korit.ch02.service;

public class EmailSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("[SMS] " + to + " : " + message);
    }
}
