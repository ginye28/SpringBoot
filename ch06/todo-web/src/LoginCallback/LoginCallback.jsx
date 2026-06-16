import { Navigate, useSearchParams } from "react-router";

function LoginCallback() {
    const [ secrchParams ] = useSearchParams();
    const accessToken = secrchParams.get("accessToken", accessToken);
    localStorage.setItem(accessToken);

    return <Navigate to={"/"} replace={true}/>
    
}

export default LoginCallback;