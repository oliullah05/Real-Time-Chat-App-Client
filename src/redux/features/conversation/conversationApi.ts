import { baseApi } from "../../api/baseApi";

const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyConversations: builder.query({
            query: () => ({
                url: "/conversation/my-conversations",
                method: "GET"
            })
        }),
        getConversationById: builder.query({
            query: (participants: string) => ({
                url: `/conversation/conversationByParticipants?participants=${participants}`,
                method: "GET"
            })
        }),
        updateConversationByParticipants: builder.mutation({
            query: (payload:{data:{ lastMessage: string,groupName?:string,groupPhoto?:string,isGroup:boolean},participants:string}) => {           
        
                return {
                    url: `/conversation/updateConversationByParticipants?participants=${payload?.participants}`,
                    method: "PUT",
                    body: payload.data
                }
            }
        }),

    })
})


export const { useGetMyConversationsQuery, useGetConversationByIdQuery,useUpdateConversationByParticipantsMutation } = conversationApi

export default conversationApi.endpoints;