import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect, useState } from "react";
import Loading from "../component/shared/Loading";
import { logOutAndResetApiState, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";


const AuthPersist = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const token = localStorage.getItem("auth")
        if (token) {
            const decoded: { id: string, role: string,email:string } = jwtDecode(token);

            
            if (decoded?.id && decoded?.role) {
                dispatch(setUser({ user: { id: decoded.id,email:decoded.email, role: decoded.role }, token:JSON.parse(token) }))
            }
          
          
                setLoading(false)
           
    
        }

        else {
            setLoading(false)
            logOutAndResetApiState()
        }
    }, [dispatch])

    if (loading) {
        return <Loading></Loading> 
    }


    return children
}



export default AuthPersist
