package com.korit.todoapi.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties
public class DuplicatedException extends RuntimeException {
    private String filedName;
    private String fieldValue;

    public DuplicatedException(String message, String filedName, String fieldValue) {
        super(message);
        this.filedName = filedName;
        this.fieldValue = fieldValue;
    }
}
