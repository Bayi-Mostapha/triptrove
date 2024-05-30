import { Outlet } from "react-router-dom";
import TopNav from "../components/guest/TopNav"
import Footer from "@/components/footer";
function GuestLayout() {

    return (
        <div className="flex flex-col min-h-screen">
            <TopNav />
            <main className="w-full flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default GuestLayout;