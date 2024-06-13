import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useCurrentToken from "../hooks/UseCurrentToken";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";


const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const token = useCurrentToken()
    if (token) {
        const decoded: { id: string, role: string } = jwtDecode(token);
        if (decoded.id && decoded.role) {
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