import { useState } from "react";
import { Route, Routes } from "react-router";
import { css } from "@emotion/react";
import SignUp from "./pages/SignUp";
import ProtectedRoutes, { PublicOnlyRoute } from "./components/ProtectedRoutes";
import Signin from "./pages/Signin";
import TodoList from "./pages/TodoList";
import GlobalStyle from "./components/styles/GlobalStyle";
import ParallaxBackground from "./components/ParallaxBackground";

const appContainerStyle = css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

function App() {
    const [offsetY, setOffsetY] = useState(0);

    const handleWheel = (e) => {
        setOffsetY(prev => prev + e.deltaY * 0.5);
    };

    return(
        <div css={appContainerStyle} onWheel={handleWheel}>
            <GlobalStyle />
            <ParallaxBackground offset={offsetY} />
            <Routes>
               <Route path="/" element={<></>} />

               <Route path="/" element={<PublicOnlyRoute />} >
                    <Route path="/auth/signup" element={<SignUp />} />
                    <Route path="/auth/signin" element={<Signin />} />
               </Route>

               <Route path="/" element={<ProtectedRoutes />} >
                    <Route path="/dash" element={<TodoList />} />
               </Route>
            </Routes>
        </div>
    )
}

export default App;