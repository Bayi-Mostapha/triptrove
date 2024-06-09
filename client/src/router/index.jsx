import {
    createBrowserRouter
} from 'react-router-dom';

// layouts 
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import HostLayout from '../layouts/HostLayout';

// pages
import SignUp from '../pages/auth/signup';
import SignIn from '../pages/auth/signin';
import ForgetPassword from '../pages/auth/forgetPassword';

import AdminSignIn from "../pages/admin/signin"
import Dashboard from "../pages/admin/dashboard"
import Users from "../pages/admin/users"
import Admins from "../pages/admin/admins-page"
import Support from "../pages/admin/support"
import Properties from "../pages/admin/properties"
import Settings from "../pages/admin/settings"
import NotFound from "../pages/notFound"






// protectors 
import GuestRoute from './protectors/GuestRoute';
import AuthRoute from './protectors/AuthRoute';
import AdminAuthRoute from './protectors/AdminAuthRoute';
import LandingPage from '@/pages/landing-page';


// auth 
export const LOGIN_LINK = '/signin';
export const REGISTER_LINK = '/signup/:role';
export const RESETPASSWORD_LINK = '/forget-password';
export const PAYMENT_LINK = '/pay';





// Admin
export const RESETPASSWORD_ADMIN_LINK = '/admin/forget-password';
export const ADMIN_LOGIN_LINK = '/admin/signin';
export const ADMIN_DASHBOARD_LINK = '/admin/dashboard';
export const ADMIN_USERS_LINK = '/admin/users';
export const ADMIN_ADMINS_LINK = '/admin/admins';
export const ADMIN_SUPPORT_LINK = '/admin/support';
export const ADMIN_PROPERTIES_LINK = '/admin/properties';
export const ADMIN_SETTINGS_LINK = '/admin/settings';
export const ADMIN_REPORTS_LINK = '/admin/reports';

// router
export const router = createBrowserRouter([
    {
        element: <GuestRoute><AuthLayout /></GuestRoute>,
        children: [
            {
                path: REGISTER_LINK,
                element: <SignUp />
            },
            {
                path: LOGIN_LINK,
                element: <SignIn />
            },
            {
                path: RESETPASSWORD_LINK,
                element: <ForgetPassword />
            },
            {
                path: ADMIN_LOGIN_LINK,
                element: <AdminSignIn />
            },
            {
                path: RESETPASSWORD_ADMIN_LINK,
                element: <ForgetPassword />
            }
        ]
    },
    {
        element: <GuestRoute><HostLayout /></GuestRoute>,
        children: [
            {
                path: "/home",
                element: <LandingPage />
            },
        ]
    },
    {
        element: <AdminAuthRoute><AdminLayout /></AdminAuthRoute>,
        children: [
            {
                path: ADMIN_DASHBOARD_LINK,
                element: <Dashboard />
            },
            {
                path: ADMIN_USERS_LINK,
                element: <Users />
            },
            {
                path: ADMIN_ADMINS_LINK,
                element: <Admins />
            },
            {
                path: ADMIN_SUPPORT_LINK,
                element: <Support />
            },
            {
                path: ADMIN_PROPERTIES_LINK,
                element: <Properties />
            },
            {
                path: ADMIN_SETTINGS_LINK,
                element: <Settings />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])