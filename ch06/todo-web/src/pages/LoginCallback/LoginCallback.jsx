import { Navigate, useSearchParams } from "react-router";

function LoginCallback() {
    const [ secrchParams ] = useSearchParams();
    const accessToken = secrchParams.get("accessToken");
    localStorage.setItem("accessToken", accessToken);

    return <Navigate to={"/"} replace={true}/>
    
}

export default LoginCallback;