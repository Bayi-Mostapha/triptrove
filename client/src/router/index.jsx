import {
    createBrowserRouter
} from 'react-router-dom';

// layouts 
import AuthLayout from '../layouts/AuthLayout';
import GuestLayout from '../layouts/GuestLayout';
import AdminLayout from '../layouts/AdminLayout';
import HostLayout from '../layouts/HostLayout';

// pages
import SignUp from '../pages/auth/signup';
import SignIn from '../pages/auth/signin';
import ForgetPassword from '../pages/auth/forgetPassword';
import SubscriptionForm from "../pages/auth/paymentSubscription"

import AdminSignIn from "../pages/admin/signin"
import Dashboard from "../pages/admin/dashboard"
import Users from "../pages/admin/users"
import Admins from "../pages/admin/admins-page"
import Support from "../pages/admin/support"
import Properties from "../pages/admin/properties"

import Home from "../pages/guest/home"
import Profile from "../pages/guest/profile"
import Property from '@/pages/guest/property';

import List from "../pages/host/listg"

// protectors 
import GuestRoute from './protectors/GuestRoute';
import AuthRoute from './protectors/AuthRoute';
import AdminAuthRoute from './protectors/AdminAuthRoute';

// auth 
export const LOGIN_LINK = '/signin';
export const REGISTER_LINK = '/signup/:role';
export const RESETPASSWORD_LINK = '/forget-password';
export const PAYMENT_LINK = '/pay';
export const HOME_LINK = '/home';


// Guest 
export const PROFILE_LINK = '/profile';
export const PROPERTY_LINK = '/property/:id';

// Host
export const HOST_LINK = '/host';

// Admin
export const RESETPASSWORD_ADMIN_LINK = '/admin/forget-password';
export const ADMIN_LOGIN_LINK = '/admin/signin';
export const ADMIN_DASHBOARD_LINK = '/admin/dashboard';
export const ADMIN_USERS_LINK = '/admin/users';
export const ADMIN_ADMINS_LINK = '/admin/admins';
export const ADMIN_SUPPORT_LINK = '/admin/support';
export const ADMIN_PROPERTIES_LINK = '/admin/properties';




// {
//     path: USER_HOME_LINK,
//     element: <GuestRoute><div>home</div></GuestRoute>
// },

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
        element: <AuthRoute><AuthLayout /></AuthRoute>,
        children: [
            {
                path: PAYMENT_LINK,
                element: <SubscriptionForm />
            },
        ]
    },
    {
        element: <AuthRoute><GuestLayout /></AuthRoute>,
        children: [
            {
                path: PROFILE_LINK,
                element: <Profile />
            },
            {
                path: PROPERTY_LINK,
                element: <Property />
            },
        ]
    },
    {
        element: <AuthRoute><HostLayout /></AuthRoute>,
        children: [
            {
                path: HOST_LINK,
                element: <List />
            }
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
        ]
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: HOME_LINK,
                element: <Home />
            },
        ]
    },
    {
        path: '*',
        element: <div>Not found</div>
    }
])