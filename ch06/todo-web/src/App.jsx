import { Route, Routes } from "react-router";
import { ProtectedRoutes, PublickOnlyRoute } from "./components/routes/ProtectedRoutes";
import Login from "./pages/Login/Login";
import LoginCallback from "./LoginCallback/LoginCallback";

function App() {

    return(
        <Routes>
            <Route element={<PublickOnlyRoute/>}>
                <Route path="/auth/login" element={<Login/>} />
                <Route path="/auth/oauth2/callback" element={<LoginCallback/>} />
            </Route>
            <Route element={<ProtectedRoutes/>}>
                <Route path="/auth/login" element={<></>} />
            </Route>
        </Routes>
    )
}

export default App;