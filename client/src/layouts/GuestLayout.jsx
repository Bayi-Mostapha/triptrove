import { Outlet } from "react-router-dom";

function GuestLayout() {
    
    return (
        <>
           <header>header </header>
            <main className="ml-48">
                <Outlet />
            </main>
        </>
    );
}

export default GuestLayout;