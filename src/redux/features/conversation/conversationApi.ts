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
        createConversation: builder.mutation({
            query: (payload:{ 
                lastMessage: string,
                isgroup?:boolean,
                groupName?:string,
                groupPhoto?:string,
                participants:string,
                conversationsUsers:{userId:string}[]
            }) => {           
        
                return {
                    url: `/conversation/create-conversation`,
                    method: "POST",
                    body: payload
                }
            }
        }),
        updateConversationByParticipants: builder.mutation({
            query: (payload:{data:{ lastMessage: string,groupName?:string,groupPhoto?:string},participants:string}) => {           
        
                return {
                    url: `/conversation/updateConversationByParticipants?participants=${payload?.participants}`,
                    method: "PUT",
                    body: payload.data
                }
            }
        }),

    })
})


export const { useGetMyConversationsQuery, useGetConversationByIdQuery,useCreateConversationMutation,useUpdateConversationByParticipantsMutation } = conversationApi

export default conversationApi.endpoints;