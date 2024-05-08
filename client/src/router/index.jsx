import {
    createBrowserRouter
} from 'react-router-dom';

// layouts 
import AuthLayout from '../layouts/AuthLayout';
import GuestLayout from '../layouts/GuestLayout';

// pages
import SignUp from '../pages/auth/signup';
import SignIn from '../pages/auth/signin';
import ForgetPassword from '../pages/auth/forgetPassword';
import SubscriptionForm from "../pages/auth/paymentSubscription"

import AdminSignIn from "../pages/admin/signin"

import Home from "../pages/guest/home" 
import Profile from "../pages/guest/profile"

// protectors 
import GuestRoute from './protectors/GuestRoute';
import AuthRoute from './protectors/AuthRoute';

// auth 
export const LOGIN_LINK = '/signin';
export const REGISTER_LINK = '/signup/:role';
export const RESETPASSWORD_LINK = '/forget-password';
export const PAYMENT_LINK = '/pay';
export const HOME_LINK = '/home';


// Guest 
export const PROFILE_LINK = '/profile';

// Host


// Admin
export const RESETPASSWORD_ADMIN_LINK = '/admin/forget-password';
export const ADMIN_LOGIN_LINK = '/admin/signin';




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
        element: <><GuestLayout /></>,
        children: [
            {
                path: HOME_LINK,
                element: <Home />
            },
            {
                path: PROFILE_LINK,
                element: <Profile />
            },
        ]
    },
    {
        path: '*',
        element: <div>Not found</div>
    }
])