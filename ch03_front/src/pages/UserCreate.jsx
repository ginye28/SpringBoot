import { useEffect, useState } from "react";
import axios from "axios";

function UserCreate() {
    const [ create, setCreate ] = useState([]);
    const [ refetch, setRefetch ] = useState(true);

    const emptyInputValues = {
        username: "",
        password: "",
        name: "",
        email: "",
    }
    const [ inputValues, setInputValues ] = useState(emptyInputValues);

    const handleInputOnChange = (e) => {
        setInputValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleRegisterPromiseOnClick = () => {
        axios.post("http://localhost:8080/api/users", inputValues) //inputValues = dto 
        .then((response) => {console.log(reponse)})
        .catch((error) => {console.log(error.response)})
    }

    const handleRegisterAsyncOnClick = async () => {
        let response = null;
        try{
            response = await axios.post("http://localhost:8080/api/users", inputValues);
        }   catch (error) {
            response = error.response;
        }
        console.log(response);
    }

    return (
        <>
            <div>
                <div>
                    <input type="text" name="username" placeholder="username" value={inputValues.username} onChange={handleInputOnChange}/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" value={inputValues.password} onChange={handleInputOnChange}/>
                </div>
                <div>
                    <input type="text" name="name" placeholder="name" value={inputValues.name} onChange={handleInputOnChange}/>
                </div>
                <div>
                    <input type="text" name="email" placeholder="email" value={inputValues.email} onChange={handleInputOnChange}/>
                </div>
                <div>
                    <button onChange={handleRegisterPromiseOnClick}>Promise등록</button>
                    <button onChange={handleRegisterAsyncOnClick}>Async등록</button>
                </div>
            </div>
        </>
    )
}

export default UserCreate;