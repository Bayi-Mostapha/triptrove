import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/AuthWrapper";
import { useNavigate } from "react-router-dom";

// import SynCareerLoadingPage from "../../pages/loading";


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
        } else if (isLoggedIn) {
            navigate('/home');
        }
    }, [isFetchingUser]);

    return (!isFetchingUser) ? children : <h1>loading</h1>;
}