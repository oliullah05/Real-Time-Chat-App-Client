import { baseApi } from "../../api/baseApi";
import { setUser } from "./authSlice";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload: { email: string, password: string }) => ({
                url: "auth/login",
                method: "POST",
                body: payload
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const isQueryFullfield = await queryFulfilled;
                    
                    if (isQueryFullfield) {
                        localStorage.setItem("auth", JSON.stringify(isQueryFullfield?.data?.data?.accessToken))
                        dispatch(setUser({ user: isQueryFullfield?.data?.data?.user, token: isQueryFullfield?.data?.data?.accessToken }))
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),
        register: builder.mutation({
            query: (payload: { email: string, name: string, password: string }) => ({
                url: "/user/create-user",
                method: "POST",
                body: payload
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                const isQueryFullfield = await queryFulfilled;
                if(isQueryFullfield){
                    localStorage.setItem("auth", JSON.stringify(isQueryFullfield?.data?.data?.accessToken))
                    dispatch(setUser({ user: isQueryFullfield?.data?.data?.user, token: isQueryFullfield?.data?.data?.accessToken }))
                }
            }
        })
    })
})


export const { useLoginMutation,useRegisterMutation } = authApi