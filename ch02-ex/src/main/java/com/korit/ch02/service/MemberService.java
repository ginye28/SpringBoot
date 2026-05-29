package com.korit.ch02.service;

import com.korit.ch02.entity.Member;
import com.korit.ch02.entity.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final TeamService teamService;

    public List<Member> getTeamMember(Long teamId) {
        return findByTeamId(teamId);
    }

    public List<Member> findByTeamId(Long teamId) {
        // 구현 생략
        return List.of();
    }
}
