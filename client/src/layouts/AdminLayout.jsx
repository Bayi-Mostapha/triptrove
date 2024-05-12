import { Outlet } from "react-router-dom";
import SideBar, { SidebarItem } from "@/components/admin/sideBar";
import { authContext } from "@/contexts/AuthWrapper";
import { useContext, useEffect } from "react";
import { ADMIN_ADMINS_LINK } from "../router/index"
import 
{ 
    LayoutDashboard,
    Users ,
    Building2  ,
    ClipboardCheck ,
    Bug ,
    UserRoundCheck ,
    Settings ,
    Bell ,
 } from 'lucide-react';
 import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import { 
    LogOut 
  } from 'lucide-react';
function HostLayout() {
    const userContext = useContext(authContext);

    const logOut = () => {
        userContext.logout();
        navigate("/admin/signin");
      };
    return (
        <>
           <header >
                <nav className="fixed top-0 left-0 right-0 z-0 px-6 py-3 flex items-center  justify-end border-b-[1px] border-gray-100 shadow-sm">
                    <div className="mr-6 cursor-pointer relative py-1">
                        <Bell color="#000000" />
                        <div className="w-2 h-2 bg-red-500 absolute top-1 right-1 rounded-full"></div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="w-10 h-10 cursor-pointer">
                                <AvatarImage src={userContext.user.image?.url} alt="@shadcn"  />
                                <AvatarFallback className="bg-[#bdbbdb]">{userContext.user.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white">
                            <DropdownMenuLabel>{userContext.user.email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-0"> 
                                <div className='w-full h-full bg-black text-white py-2 px-3 flex items-center justify-center gap-2 cursor-pointer' onClick={logOut}>
                                    <LogOut color='white' size={18}/>
                                    <p>logout </p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                {  userContext.user.role === "superAdmin" &&
                    <SidebarItem icon={<UserRoundCheck    color="#222222" size={22}/>} text={'Admins'} location={ADMIN_ADMINS_LINK} />
                }
                <SidebarItem icon={<Settings      color="#222222" size={22}/>} text={'Settings'} location={"/dashboard"} />
            </SideBar>
            <main className="pt-16 pl-24 p-3 pr-5">
                <Outlet />
            </main>
        </>
    );
}

export default HostLayout;