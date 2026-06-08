import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router"
import { signIn, signUp } from "../api/authApi";
import { useAuthStore } from "../store/AuthStore";

export function useSignUp() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (signUpData) => signUp(signUpData),
        onSuccess: () => {
            alert("회원가입 성공! 로그인 해주세요.");
            navigate("/auth/signin");

        },
        onError: (error) => {
            const message = error.response.data.body.message;
            alert(message);
        }
    });
}

export function useSignIn() {
    const navigate = useNavigate();
    const saveToken = useAuthStore((state) => state.saveToken);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (signInData) => signIn(signInData),
        onSuccess: (data) => {
            saveToken(data.body.accessToken);
            queryClient.invalidateQueries();    // invalidate: 유효기간 만료    (괄호 비워두면 모두 날림)
            navigate("/");

        },
        onError: (error) => {
            const message = error.response.data.body.message;
            alert(message);
        }
    }) 
}