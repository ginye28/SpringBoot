import { useState } from "react";
import { Link, replace } from "react-router";
import { css } from "@emotion/react";
import GlassCard from "../components/GlassCard";
import { useSignIn } from "../hooks/userAuth";

const headerStyle = css`
    text-align: center;
    margin-bottom: 24px;
`;

const linkContainerStyle = css`
    text-align: right;
    margin-bottom: 24px;
    font-size: 0.9rem;
`;

const formGroupStyle = css`
    margin-bottom: 16px;
    width: 100%;
`;

const buttonContainerStyle = css`
    margin-top: 32px;
    width: 100%;
`;

function Signin() {
    const emptyInputValues = {
        username: "",
        password: "",
    }
    
    const [ inputValues, setInputValues ] = useState(emptyInputValues);
    
    const handleInputOnChange = (e) => {
        setInputValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const signInMutation = useSignIn();

    const handleSignInOnClick = async () => {
        try {
            await signInMutation.mutateAsync(inputValues);
            setInputValues(emptyInputValues);
        } catch (error) {
            console.error("로그인 에러:", error);
        }
    }

    return(
        <GlassCard>
            <h1 css={headerStyle}>로그인</h1>
            <div css={linkContainerStyle}>
                <Link to={"/auth/signup"}>회원가입</Link>
            </div>
            <div css={formGroupStyle}>
                <input type="text" name="username" placeholder="사용자이름" value={inputValues.username} onChange={handleInputOnChange}/>
            </div>
            <div css={formGroupStyle}>
                <input type="password" name="password" placeholder="비밀번호" value={inputValues.password} onChange={handleInputOnChange}/>
            </div>
            <div css={buttonContainerStyle}>
                <button onClick={handleSignInOnClick}>로그인</button>
            </div>
        </GlassCard>
    )
}

export default Signin;