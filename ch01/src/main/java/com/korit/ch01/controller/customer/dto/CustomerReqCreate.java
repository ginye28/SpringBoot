package com.korit.ch01.controller.customer.dto;

public record CustomerReqCreate(
        int userId,
        String name,
        String phoneE164    //+82
) {}
