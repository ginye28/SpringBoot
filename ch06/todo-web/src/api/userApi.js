import { axiosInstance } from "./axiosInstance";

export const getMeRequest = async () => {
    try {                                           //users (복수)
        const response = await axiosInstance.get("/api/users/me"); //Back에 UserController 안에 있는 getMapping 주소
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}