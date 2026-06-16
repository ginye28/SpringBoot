import { Navigate, Outlet } from "react-router";
import { useMe } from "../../hooks/queries/useUser";

export function ProtectedRoutes() {
    const meQuery = useMe();

    if (meQuery.isLoading) {
        return <h1>로딩 중...</h1>
    }

    const isLoggedIn = meQuery.data.success;

    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"} replace={true} />
    }


    return <Outlet />
}

export function PublickOnlyRoute() {

    const accessToken = "";
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return <Navigate to={"/"} replace={true} />
    }

    return <Outlet />
}