import { Navigate, Outlet } from "react-router";
import { useMe } from "../../hooks/queries/useUser";
import { useSpinnersStore } from "../../store/spinners";

export function ProtectedRoutes() {
    const meQuery = useMe();
    const setLoading = useSpinnersStore((state) => state.setLoading);
    
    setLoading(meQuery.isLoading);

    if (meQuery.isLoading) {
        return <></>
    }

    const isLoggedIn = meQuery.data?.success;

    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"} replace={true} />
    }

    return <Outlet />
}

export function PublicOnlyRoute() {
    const meQuery = useMe();
    const setLoading = useSpinnersStore((state) => state.setLoading);
    
    setLoading(meQuery.isLoading);

    if (meQuery.isLoading) {
        return <></>
    }
    const isLoggedIn = meQuery.data?.success;

    if (isLoggedIn) {
        return <Navigate to={"/"} replace={true} />
    }

    return <Outlet />
}

// import { useEffect } from "react";
// import { Navigate, Outlet } from "react-router";
// import { useMe } from "../../hooks/queries/useUser";
// import { useSpinnersStore } from "../../store/spinners";

// export function ProtectedRoutes() {
//     const meQuery = useMe();

//     // ⭕ 중괄호 제거 또는 return 명시로 올바르게 수정
//     const setLoading = useSpinnersStore((state) => state.setLoading);

//     // ⭕ boolean 값을 훅에 직접 넣는 대신, useEffect를 통해 스토어 상태 변경
//     useEffect(() => {
//         setLoading(meQuery.isLoading);
//     }, [meQuery.isLoading, setLoading]);

//     // React Query가 데이터를 가져오는 중일 때는 아래 유효성 검사를 잠시 대기
//     if (meQuery.isLoading) {
//         return null; // 혹은 로딩용 플레이스홀더
//     }

//     // meQuery.data가 안전하게 존재할 때 success 여부 확인
//     const isLoggedIn = meQuery.data?.success;

//     if (!isLoggedIn) {
//         return <Navigate to={"/auth/login"} replace={true} />;
//     }

//     return <Outlet />;
// }

// export function PublicOnlyRoute() {
//     const meQuery = useMe();

//     // ⭕ 동일하게 수정
//     const setLoading = useSpinnersStore((state) => state.setLoading);

//     useEffect(() => {
//         setLoading(meQuery.isLoading);
//     }, [meQuery.isLoading, setLoading]);

//     if (meQuery.isLoading) {
//         return null; 
//     }

//     const isLoggedIn = meQuery.data?.success;

//     if (isLoggedIn) {
//         return <Navigate to={"/"} replace={true} />;
//     }

//     return <Outlet />;
// }