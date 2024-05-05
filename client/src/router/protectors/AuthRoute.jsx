import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/AuthWrapper";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/loading";

export default function AuthRoute({ children }) {
    const {
        getUser,
        isLoggedIn,
        isFetchingUser
    } = useContext(authContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isLoggedIn && localStorage.getItem('token') != null) {
            getUser()
        } else if (!isLoggedIn && !isFetchingUser) {
            navigate('/signin');
        } 
    }, [isFetchingUser,isLoggedIn]);
  
    return ( isLoggedIn && !isFetchingUser ) ? children : <LoadingPage />;
}
