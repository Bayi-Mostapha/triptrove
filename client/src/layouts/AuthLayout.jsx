import { Outlet } from "react-router-dom";

function AuthLayout() {
    
    return (
        <>
            <main className="">
                <Outlet />
            </main>
        </>
    );
}

export default AuthLayout;