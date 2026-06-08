import { Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import ProtectedRoutes, { PublicOnlyRoute } from "./components/ProtectedRoutes";
import Signin from "./pages/Signin";

function App() {

    return(
        <Routes>
           <Route path="/" element={<></>} />

           <Route path="/" element={<PublicOnlyRoute />} >
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/signin" element={<Signin />} />
           </Route>

           <Route path="/" element={<ProtectedRoutes />} >

           </Route>
        </Routes>
    )
}

export default App;