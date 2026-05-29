package com.korit.ch02.service;

import com.korit.ch02.entity.Member;
import com.korit.ch02.entity.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final MemberService memberService;

    public Team getTeamMembers(Long memberId) {
        return findByTeamId(teamId);
    }

    public Team getTeamMembers(Long memberId) {
        return null;
    }


}
