package com.korit.ch01.controller;

import com.korit.ch01.dto.UserDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

//서블릿 -> 클래스당
//스프링부트 -> 메서드당

@Controller
public class HelloController {

    @GetMapping("/api/hello")
//    @ResponseBody   //안 붙이면 화면을 붙이면 데이터로 응답
    public String hello() {
        //ResponseBody를 안 붙이면 view의 경로가 됨
        return "/hello.html";
    }

    @GetMapping("/api/hello2")
    @ResponseBody
    public String hello2() {
        return "데이터 응답";
    }

    @GetMapping("/api/hello3")
    @ResponseBody
    public Map<String, Object> hello3() {
        return Map.of(
                "name", "jhj",
                "age", 21
        );
    }

//    @GetMapping("/api/hello4")
//    @ResponseBody
//    public List<Object> hello4() {
//        return new UserDto("test", "1234", "jhj", "qwer@gamil.com");
//
//    }
}
