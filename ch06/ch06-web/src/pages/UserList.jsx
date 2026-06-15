import axios from "axios";
import { useState } from "react";

function UserList() {
    const [ users, setUsers ] = useState([]);

    const handleUserListOnClick = async () => {
        let response = null;
        try {
            response = await axios.get("http://localhost:8080/api/users")
        } catch (error) {
            response = error.response;
        }
        console.log(response);
        setUsers(response.data.body);
    }
    return(
        <>
           <button>리스트 불러오기</button>
           <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>EMAIL</th>
                        <th>NICKNAME</th>
                    </tr>
                </thead>
           </table>
        </>
    )
}

export default UserList;