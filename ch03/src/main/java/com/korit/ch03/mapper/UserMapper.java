package com.korit.ch03.mapper;

import com.korit.ch03.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User user);
    List<User> selectAll();
    User selectById(Long userId);
    User selectByUsername(String username);
}
