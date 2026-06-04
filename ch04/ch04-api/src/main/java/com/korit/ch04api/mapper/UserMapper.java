package com.korit.ch04api.mapper;

import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User user);
    User selectByUsername(String Username);
    User selectById(Long userId);
}
