import {
    createBrowserRouter
} from 'react-router-dom';

// layouts 
import AuthLayout from '../layouts/AuthLayout';

// pages
import SignUp from '../pages/signup';

// protectors 
import GuestRoute from './protectors/GuestRoute';
import AuthRoute from './protectors/AuthRoute';

// auth 
export const LOGIN_LINK = '/signin';
export const REGISTER_LINK = '/signup';


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
            }
        ]
    },
    {
        path: '*',
        element: <div>Not found</div>
    }
])