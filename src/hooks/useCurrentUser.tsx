import { useAppSelector } from "../redux/hooks";

const useCurrentUser = () => {
    const user = useAppSelector(state=>state.auth.user) as  {id:string,role:string,email?:string} | null
    return user
};

export default useCurrentUser;