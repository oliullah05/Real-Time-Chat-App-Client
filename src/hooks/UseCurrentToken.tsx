import { useAppSelector } from "../redux/hooks";

const useCurrentToken = () => {
    const user = useAppSelector(state=>state.auth.token) as string |null
    return user
};

export default useCurrentToken;