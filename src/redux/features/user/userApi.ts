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
        }),
        searchUsersWithoutMeForMessage: builder.query({
            query: (searchTerm) => ({
                url: `/user/searchUsersWithoutMeForMessage/${searchTerm}`,
                method: "GET"
            })
        }),
    })
})


export const { useGetUsersWithoutMeForMessageQuery ,useSearchUsersWithoutMeForMessageQuery} = userApi

export default userApi.endpoints