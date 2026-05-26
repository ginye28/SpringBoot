package com.korit.ch01.controller;

import com.korit.ch01.dto.RestaurantDto;
import com.korit.ch01.dto.StudentDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class RequestController {

    @GetMapping("/api/get/params")
    public Object req1(
            @RequestParam String name,
            @RequestParam int age) {
        System.out.println(name);
        System.out.println(age);
        return "";
    }
    @GetMapping("/api/get/params/dto")
    public Object req2(StudentDto dto) {
        System.out.println(dto);
        return "";
    }

    @PostMapping("/api/post/body")
    //요청 받고 싶을 때 Dto에 @RequestBody를 붙여줌
    public Object req3(@RequestBody StudentDto dto) {
        System.out.println(dto);
        return "";
    }

    @PostMapping("/api/restaurants")
    public Object req4(@RequestBody RestaurantDto rdto) {
        System.out.println(rdto);
        return "";
    }



}
