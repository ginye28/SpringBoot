import axios from "axios";
import { useState } from "react";

function UserList() {
    const [ users, setUsers ] = useState([]);

    const handleUserListLoadOnClick = async () => {
        let response = null;
        try {
            response = await axios.get("http://localhost:8080/api/users");
        } catch (error) {
            response = error.response;
        }
        console.log(response);
        setUsers(response.data.body);
    }

    return (
        <>
            <button onClick={handleUserListLoadOnClick}>사용자 정보 불러오기</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USERNAME</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.roles.map(role => <span key={user.id + "," + role.roleId}>[{role.roleId}:{role.rolename}]</span>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default UserList;