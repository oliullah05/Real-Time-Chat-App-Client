import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsersWithoutMeForMessage: builder.query({
            query: () => {
                return {
                    url: `/user/getUsersWithoutMeForMessage`,
                    method: "GET"
                }
            }
        })
    })
})


export const { useGetUsersWithoutMeForMessageQuery } = userApi