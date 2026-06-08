import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSignUp } from "../hooks/userAuth";
import { css } from "@emotion/react";
import GlassCard from "../components/GlassCard";

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
    margin-bottom: 12px;
    width: 100%;
`;

const errorStyle = css`
    color: #ff6b6b;
    font-size: 0.8rem;
    margin-top: -12px;
    margin-bottom: 12px;
    margin-left: 4px;
    min-height: 1.2rem;
`;

const buttonContainerStyle = css`
    margin-top: 24px;
    width: 100%;
`;

function SignUp() {
    const REGEX = {
        // 영문 소문자/숫자/언더스코어, 4~20자, 첫 글자는 영문
        username: /^[a-z][a-z0-9_]{3,19}$/,

        // 영문 대소문자 + 숫자 + 특수문자 각 1개 이상, 8~20자
        password: /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,20}$/,

        // 한글 2~10자 또는 영문 2~30자 (공백 일부 허용)
        name: /^[가-힣]{2,10}$|^[a-zA-Z\\s]{2,30}$/,

        // 표준 이메일
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
    };
    
    const emptyInputs = {
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
    };
    
    const [ inputValues, setInputValues ] = useState(emptyInputs);
    const [ inputErrors, setInputErrors ] = useState(emptyInputs);
    const [ signUpDisabled, setSignUpDisabled ] = useState(true);

    const signUpMutation = useSignUp();
    
    const handleInputOnChange = (e) => {
        setInputValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSignUpOnClick = async () => {
        await signUpMutation.mutateAsync(inputValues);
        setInputValues(emptyInputs);
    }

    const validate = ({username, password, confirmPassword, name, email}) => {
        const errors = {};

        if (!REGEX.username.test(username) && !!username) {
            errors.username = "영문 소문자로 시작, 4~20자 (숫자, 특수문자 -, _ 포함 가능)";
        }
        if (!REGEX.password.test(password) && !!password) {
            errors.password = "영문, 숫자, 특수문자 포함 8~20자";
        }
        if (password !== confirmPassword && !!confirmPassword) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }
        if (!REGEX.name.test(name) && !!name) {
            errors.name = "이름을 정확히 입력해주세요.";
        }
        if (!REGEX.email.test(email) && !!email) {
            errors.email = "올바른 이메일 형식이 아닙니다.";
        }

        return errors;
    }
    
    useEffect(() => {
        setInputErrors(validate(inputValues));
    }, [inputValues]);

    useEffect(() => {
        const inputEmptyValuesEntries = Object.values(inputValues).filter(value => !value);
        const inputErrorsEntries = Object.entries(inputErrors);
        setSignUpDisabled(inputEmptyValuesEntries.length > 0 || inputErrorsEntries.length > 0);
    }, [inputErrors])


    return(
        <GlassCard>
            <h1 css={headerStyle}>회원가입</h1>
            <div css={linkContainerStyle}>
                <Link to={"/auth/signin"}>로그인</Link>
            </div>
            
            <div css={formGroupStyle}>
                <input type="text" name="username" placeholder="사용자이름" value={inputValues.username} onChange={handleInputOnChange}/>
            </div>
            <div css={errorStyle}>{inputErrors.username}</div>

            <div css={formGroupStyle}>
                <input type="password" name="password" placeholder="비밀번호" value={inputValues.password} onChange={handleInputOnChange}/>
            </div>
            <div css={errorStyle}>{inputErrors.password}</div>

            <div css={formGroupStyle}>
                <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={inputValues.confirmPassword} onChange={handleInputOnChange}/>
            </div>
            <div css={errorStyle}>{inputErrors.confirmPassword}</div>

            <div css={formGroupStyle}>
                <input type="text" name="name" placeholder="이름" value={inputValues.name} onChange={handleInputOnChange}/>
            </div>
            <div css={errorStyle}>{inputErrors.name}</div>

            <div css={formGroupStyle}>
                <input type="text" name="email" placeholder="이메일" value={inputValues.email} onChange={handleInputOnChange}/>
            </div>
            <div css={errorStyle}>{inputErrors.email}</div>

            <div css={buttonContainerStyle}>
                <button disabled={signUpDisabled} onClick={handleSignUpOnClick}>회원가입</button>
            </div>
        </GlassCard>
    )
}

export default SignUp;