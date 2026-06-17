import { useQuery } from "@tanstack/react-query"
import { getMeRequest } from "../../api/userApi";

export const useMe = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["me", accessToken],
        queryFn: getMeRequest,
        retry: 0,   //다시 시도 횟수
        staleTime: 6000 * 10,   //캐싱 시간
        gcTime: 6000 * 10,
    });
}