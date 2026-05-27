package com.korit.ch01.controller.customer.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(
        name = "CustomerReqCreate",
        description = "mmm"
)
public record CustomerResp(
        @Schema(
                example = "1",
                description = "고객 고유 번호(PK)"
        )
        int customerId,
        @Schema(
                example = "16",
                description = "고객 고유 번호(FK)"
        )
        int userId,
        @Schema(
                example = "namename",
                description = "사용자 이름"
        )
        String name,
        @Schema(
                example = "+82102341234",
                description = "사용자 전화번호 (E.164 국제 표준)"
        )
        String phoneE164,
        @Schema(
                description = "- 정보 등록 일시"
        )
        LocalDateTime createdAt,
        @Schema(
                description = "- 정보 수정 일시"
        )
        LocalDateTime updatedAt
) {}
