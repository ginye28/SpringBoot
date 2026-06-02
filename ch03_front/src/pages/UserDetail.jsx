import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function UserDetail() {
    const { userId } = useParams();
    const emptyUser = {
        id: "",
        username: "",
        name: "",
        email: "",
        roles: [],
    }
    const [ user, setUser ] = useState({}); //<-

    const getUserReq = async () => {
        let response = null;
        try {
            response = await axios.get("http://localhost:8080/api/users")
        } catch (error) {
            response = error.response;
        }
        setUser(response.data.body);
    }

    useEffect(() => {
        getUserReq();
    }, []);

    return (
        <>
            <ul>
                <li>ID: {user.id}</li>
                <li>USERNAME: {user.username}</li>
                <li>NAME: {user.name}</li>
                <li>EMAIL: {user.email}</li>
                <li>
                    ROLE: 
                    <ol>
                        {user.roles.map(role => <li key={role.roleId}>{role.rolename}</li>)}
                    </ol>
                </li>
            </ul>
        </>
    )
}

export default UserDetail;