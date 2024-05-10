import { Outlet } from "react-router-dom";
import SideBar, { SidebarItem } from "@/components/admin/sideBar";
import { authContext } from "@/contexts/AuthWrapper";
import { useContext } from "react";


import { TiArrowSortedDown } from "react-icons/ti";
import 
{ 
    LayoutDashboard,
    Users ,
    Building2  ,
    ClipboardCheck ,
    Bug ,
    UserRoundCheck ,
    Settings ,
 } from 'lucide-react';

function HostLayout() {
    const { user } = useContext(authContext)
    return (
        <>
           <header >
                <nav className="fixed top-0 left-0 right-0 z-0 px-6 py-3 flex items-center bg-violet-400 shadow justify-end">
                       hhhhhh
                </nav >
           </header>
           <SideBar>
                <SidebarItem icon={<LayoutDashboard color="#222222" size={22} />} text={'Dashboard'} location={"/admin/dashboard"} />
                {/* {
                    user.role == 's' &&
                    <SidebarItem icon={<MdOutlineAdminPanelSettings />} text={'Admins'} location={ADMINS_LINK} />
                } */}
                <SidebarItem icon={<Users color="#222222" size={22}/>} text={'Users'} location={"/admin/users"} />
                <SidebarItem icon={<Building2   color="#222222" size={22}/>} text={'Properties'} location={"/dashboard"} />
                <SidebarItem icon={<ClipboardCheck   color="#222222" size={22}/>} text={'Reports'} location={"/dashboard"} />
                <SidebarItem icon={<Bug    color="#222222" size={22}/>} text={'Bugs'} location={"/dashboard"} />
                <SidebarItem icon={<UserRoundCheck    color="#222222" size={22}/>} text={'Admins'} location={"/dashboard"} />
                <SidebarItem icon={<Settings      color="#222222" size={22}/>} text={'Settings'} location={"/dashboard"} />
            </SideBar>
            <main className="p-4 pt-14 pl-24">
                <Outlet />
            </main>
        </>
    );
}

export default HostLayout;