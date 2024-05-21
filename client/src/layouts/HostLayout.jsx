import { Outlet } from "react-router-dom";
import  TopNav  from "../components/host/TopNavHost"
function GuestLayout() {
    
    return (
        <>
            <TopNav />
            <main className="max-w-6xl  mx-auto">
                <Outlet />
            </main>
        </>
    );
}

export default GuestLayout;