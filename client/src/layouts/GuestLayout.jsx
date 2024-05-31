import { Outlet } from "react-router-dom";
import TopNav from "../components/host/TopNavHost"
import Footer from "@/components/footer";
function GuestLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNav />
            <main className="w-full max-w-6xl mx-auto flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default GuestLayout;