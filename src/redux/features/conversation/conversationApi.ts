import { baseApi } from "../../api/baseApi";

const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyConversations: builder.query({
            query: () => ({
                url: "/conversation/my-conversations",
                method: "GET"
            })
        }),
    })
})


export const {useGetMyConversationsQuery} = conversationApi