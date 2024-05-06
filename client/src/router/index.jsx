import {
    createBrowserRouter
} from 'react-router-dom';

// layouts 
import AuthLayout from '../layouts/AuthLayout';

// pages
import SignUp from '../pages/auth/signup';
import SignIn from '../pages/auth/signin';
import ForgetPassword from '../pages/auth/forgetPassword';

// protectors 
import GuestRoute from './protectors/GuestRoute';
import AuthRoute from './protectors/AuthRoute';

// auth 
export const LOGIN_LINK = '/signin';
export const REGISTER_LINK = '/signup';
export const RESETPASSWORD_LINK = '/forget-password';


// Guest 


// Host


// Admin






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
            }
        ]
    },
    {
        path: '*',
        element: <div>Not found</div>
    }
])