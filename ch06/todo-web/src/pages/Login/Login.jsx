import { Link, useNavigate } from "react-router";
import * as s from "./styles";



function Login() {
    const baseUrl = "http://localhost:8080/oauth2/authorization";

    return(
        <>
            <h1>로그인</h1>
            <Link to={`${baseUrl}/google`} onClick={handleLoginOnClick}>google login</Link>
            <Link to={`${baseUrl}/naver`} onClick={handleLoginOnClick}>naver login</Link>
            <Link to={`${baseUrl}/kakao`} onClick={handleLoginOnClick}>kakao login</Link>
        </>
    )
}

export default Login;