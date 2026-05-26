package com.korit.ch01.dto;

public record RestaurantDto(
    String name,
    String category,
    String address,
    double rating
) {}
