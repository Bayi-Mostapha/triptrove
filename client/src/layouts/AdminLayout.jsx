import { Outlet } from "react-router-dom";
import SideBar, { SidebarItem } from "@/components/admin/sideBar";
import { ADMIN_ADMINS_LINK } from "../router/index"
import 
{ 
    LayoutDashboard,
    Users ,
    Building2  ,
    ClipboardCheck ,
    MessageSquareWarning  ,
    UserRoundCheck ,
    Settings ,
    Bell ,
 } from 'lucide-react';
import TopNav from "../components/admin/TopNav";
import { authContext } from "@/contexts/AuthWrapper";
import { useContext } from "react";





function AdminLayout() {
    const userContext = useContext(authContext);
    return (
        <>
          <TopNav />
           <SideBar>
                <SidebarItem icon={<LayoutDashboard color="#222222" size={22} />} text={'Dashboard'} location={"/admin/dashboard"} />
                {/* {
                    user.role == 's' &&
                    <SidebarItem icon={<MdOutlineAdminPanelSettings />} text={'Admins'} location={ADMINS_LINK} />
                } */}
                <SidebarItem icon={<Users color="#222222" size={22}/>} text={'Users'} location={"/admin/users"} />
                <SidebarItem icon={<Building2   color="#222222" size={22}/>} text={'Properties'} location={"/admin/properties"} />
                <SidebarItem icon={<ClipboardCheck   color="#222222" size={22}/>} text={'Reports'} location={"/admin/reports"} />
                <SidebarItem icon={<MessageSquareWarning     color="#222222" size={22}/>} text={'support'} location={"/admin/support"} />
                {  userContext.user.role === "superAdmin" &&
                    <SidebarItem icon={<UserRoundCheck    color="#222222" size={22}/>} text={'Admins'} location={ADMIN_ADMINS_LINK} />
                }
                <SidebarItem icon={<Settings      color="#222222" size={22}/>} text={'Settings'} location={"/admin/settings"} />
            </SideBar>
            <main className="">
                <Outlet />
            </main>
        </>
    );
}

export default AdminLayout;