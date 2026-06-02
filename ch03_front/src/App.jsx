import { Route, Routes } from "react-router";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserDetail from "./pages/UserDetail";

function App() {

    return (
        <>
            <Routes>
                <Route path="/users/create" element={<UserCreate/>}/>
                <Route path="/users/" element={<UserList />}/>
                <Route path="/users/:userId" element={<UserDetail />}/>
                <Route path="/roles/create" element={<></>}/>
                <Route path="/roles" element={<></>}/>
            </Routes>
        </>
    )
}

export default App;
