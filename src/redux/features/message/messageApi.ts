/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyMessagesByConversationId: builder.query({
            query: (conversationId) => ({
                url: `/message/conversationId/${conversationId}`,
                method: "GET"
            })
        }),
    
        createMessage: builder.mutation({
            query: (payload: {
                message: string,
                type?: string,
                conversationId: string
            }) => {

                return {
                    url: `/message/create-message`,
                    method: "POST",
                    body: payload
                }
            },
        },
        ),
   

    }),
})


export const { useCreateMessageMutation,useGetMyMessagesByConversationIdQuery } = messageApi

export default messageApi.endpoints;