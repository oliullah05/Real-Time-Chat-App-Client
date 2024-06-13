import { useAppSelector } from "../redux/hooks";

const useCurrentUser = () => {
    const user = useAppSelector(state=>state.auth.user)
    return user
};

export default useCurrentUser;