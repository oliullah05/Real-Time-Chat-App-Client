import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { logOut, setUser } from "../redux/features/auth/authSlice";


const AuthGate = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const token = localStorage.getItem("auth")
        if (token) {
            const decoded: { id: string, role: string } = jwtDecode(token);
            if (decoded?.id && decoded?.role) {
                dispatch(setUser({ user: { id: decoded.id, role: decoded.role }, token:JSON.parse(token) }))
            }
            setLoading(false)
        }

        else {
            setLoading(false)
            logOut()
        }
    }, [dispatch])

    if (loading) {
        return <div className="text-7xl bg-red-700 flex justify-center items-center">Loading.........</div>
    }


    return children
}



export default AuthGate
