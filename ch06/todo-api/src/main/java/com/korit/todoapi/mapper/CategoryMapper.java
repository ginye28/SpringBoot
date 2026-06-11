package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    int insert(Category category);
    List<Category> selectAll();
    Category selectById(Long categoryId);
    Category selectByCategoryName(String categoryName);
}
