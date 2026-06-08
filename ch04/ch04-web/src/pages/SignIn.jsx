import { useState } from "react";
import { Link, replace } from "react-router";


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

    const handleSignInOnClick = () => {
        setInputValues(emptyInputValues);
    }

    return(
        <>
            <h1>로그인</h1>
            <ul>
                <Link to={"/auth/signup"}>회원가입</Link>
            </ul>
            <div>
                <input type="text" name="username" placeholder="사용자이름" value={inputValues.username} onChange={handleInputOnChange}/>
            </div>
            <div>
                <input type="password" name="password" placeholder="비밀번호" value={inputValues.password} onChange={handleInputOnChange}/>
            </div>
            <div>
                <button onClick={handleSignInOnClick}>로그인</button>
            </div>
        </>
    )
}

export default Signin;