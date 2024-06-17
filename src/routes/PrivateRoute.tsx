import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useCurrentToken from "../hooks/UseCurrentToken";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import useCurrentUser from "../hooks/useCurrentUser";


const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const token = useCurrentToken()
    const user = useCurrentUser() 
   
    if (token && user) {
    
        if (user.id && user.role) {
            return children
        }
        else {
            dispatch(logOut());
            return <Navigate to="/login" replace={true} />;
        }
    }

    else {
        dispatch(logOut());
        return <Navigate to="/login" replace={true} />;
    }

};

export default PrivateRoute;