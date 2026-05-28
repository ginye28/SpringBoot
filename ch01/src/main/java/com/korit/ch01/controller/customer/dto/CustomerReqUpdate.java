package com.korit.ch01.controller.customer.dto;

import lombok.Data;

@Data
public class CustomerReqUpdate {
    private String password;
    private String confirmPassword;
    private String name;
}
