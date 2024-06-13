import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useCurrentToken from "../hooks/UseCurrentToken";


const PublicRoute = ({ children }: { children: ReactNode }) => {
    const token = useCurrentToken()
    if (token) {
        const decoded: { id: string, role: string } = jwtDecode(token);
        if (decoded.id && decoded.role) {
            return <Navigate to="/" replace={true} />
        }
        else {
            return children;
        }
    }

    else {
        return children;
    }

};

export default PublicRoute;
