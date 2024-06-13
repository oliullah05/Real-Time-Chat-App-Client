import { useAppSelector } from "../redux/hooks";

const useCurrentToken = () => {
    const user = useAppSelector(state=>state.auth.token)
    return user
};

export default useCurrentToken;