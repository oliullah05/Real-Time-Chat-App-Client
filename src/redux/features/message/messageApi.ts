/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getMyConversations: builder.query({
        //     query: () => ({
        //         url: "/conversation/my-conversations",
        //         method: "GET"
        //     })
        // }),
    
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


export const { useCreateMessageMutation } = messageApi

export default messageApi.endpoints;