import { Outlet } from "react-router-dom";
import SideBar, { SidebarItem } from "@/components/admin/sideBar";
import { authContext } from "@/contexts/AuthWrapper";
import { useContext } from "react";


import { TiArrowSortedDown } from "react-icons/ti";


function HostLayout() {
    const { user } = useContext(authContext)
    return (
        <>
           <header >
                <nav className="fixed top-0 left-0 right-0 z-0 px-6 py-0 flex items-center bg-gray-200 shadow">
                        header 
                </nav >
           </header>
           <SideBar>
                <SidebarItem icon={<TiArrowSortedDown />} text={'Dashboard'} location={"/dashboard"} />
                {/* {
                    user.role == 's' &&
                    <SidebarItem icon={<MdOutlineAdminPanelSettings />} text={'Admins'} location={ADMINS_LINK} />
                } */}
                <SidebarItem icon={<TiArrowSortedDown />} text={'Users'} location={"/dashboard"} />
                <SidebarItem icon={<TiArrowSortedDown />} text={'Job Offers'} location={"/dashboard"} />
            </SideBar>
            <main className="">
                <Outlet />
            </main>
        </>
    );
}

export default HostLayout;