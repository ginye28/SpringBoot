package com.korit.ch02.controller;

import com.korit.ch02.component.CustomerUtil;
import com.korit.ch02.service.CustomerService;
import com.korit.ch02.service.PhoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/customers")
@RestController
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerUtil customerUtil;
    private final PhoneService p1;
    private final PhoneService p2;
}
