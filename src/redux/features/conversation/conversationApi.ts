/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import messageApi from "../message/messageApi";

const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyConversations: builder.query({
            query: () => ({
                url: "/conversation/my-conversations",
                method: "GET"
            })
        }),
        getConversationByParticipants: builder.query({
            query: (participants: string) => ({
                url: `/conversation/conversationByParticipants?participants=${participants}`,
                method: "GET"
            })
        }),
        createConversation: builder.mutation({
            query: (payload: {
                lastMessage: string,
                participants: string,
                isGroup?: boolean,
                groupName?: string,
                groupPhoto?: string,
                conversationsUsers: { userId: string }[]
            }) => {

                return {
                    url: `/conversation/create-conversation`,
                    method: "POST",
                    body: payload
                }
            },
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            // }
        },
        ),
        updateConversationByParticipants: builder.mutation({
            query: (payload: { data: { lastMessage: string, groupName?: string, groupPhoto?: string }, participants: string }) => {

                return {
                    url: `/conversation/updateConversationByParticipants?participants=${payload?.participants}`,
                    method: "PUT",
                    body: payload.data
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const conversation: any = await queryFulfilled;
                if(conversation.data.success &&   conversation.data.data.id){
                   const payload = {
                    message:arg.data.lastMessage,
                    conversationId:conversation.data.data.id
                   }
                   dispatch(messageApi.createMessage.initiate(payload)).unwrap()
                }
            }
        }),

        
    }),
})


export const { useGetMyConversationsQuery, useGetConversationByParticipantsQuery, useCreateConversationMutation, useUpdateConversationByParticipantsMutation } = conversationApi

export default conversationApi.endpoints;