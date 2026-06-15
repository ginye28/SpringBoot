package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User user);
    User selectByProviderId(String providerId);
    List<User> selectAll();
    User selectByNickname(String nickname);
}
