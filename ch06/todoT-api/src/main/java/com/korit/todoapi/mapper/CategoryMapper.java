package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.CategoryCompletionCount;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    int insert(Category category);
    List<CategoryCompletionCount> countNotCompletedByUserId(Long userId);
}
