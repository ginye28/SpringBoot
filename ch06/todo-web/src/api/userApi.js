import { axiosInstance } from "./axiosInstance";

export const getMeRequest = async () => {
    try {
        const response = await axiosInstance.get("/api/user/me"); //Back에 UserController 안에 있는 getMapping 주소
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}