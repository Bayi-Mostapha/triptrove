import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/AuthWrapper";
import { useNavigate } from "react-router-dom";

import LoadingPage from "../../pages/loading";


export default function GuestRoute({ children }) {
    const {
        getUser,
        isFetchingUser,
        isLoggedIn,
    } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && localStorage.getItem('token') != null) {
            getUser()
        } else if(isLoggedIn){
            if(localStorage.getItem('admin')){
                navigate('/admin/dashboard');
            }else{
                navigate('/explore');
            } 
        }
    }, [isFetchingUser]);
    
    return (!isFetchingUser) ? children : <LoadingPage />;
}