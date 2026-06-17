import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//axiosInstance로 요청을 보내면 interceptiors가 header에 accessToken을 심어줌

axiosInstance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response.status === 401) {    //401 토큰 인가 실패 
            localStorage.removeItem("accessToken");
            // window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

