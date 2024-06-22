/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
type TConversation = {
    id: string;
    lastMessage: string;
    participants: string;
    isGroup: boolean;
    groupName: string | null;
    groupPhoto: string | null;
    isDeleted: boolean;
    updatedAt: string | Date,
    createdAt: string
    conversationsUsers: {
        userId: string;
        conversationId: string;
        user: {
            profilePhoto: string;
            name: string;
            id: string;
        };
    }[];
};
const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyConversations: builder.query({
            query: () => ({
                url: "/conversation/my-conversations",
                method: "GET"
            })
        }),
        getConversationById: builder.query({
            query: (id) => ({
                url: `/conversation/conversationById/${id}`,
                method: "GET"
            })
        }),
        // getConversationByParticipants: builder.query({
        //     query: (participants: string) => ({
        //         url: `/conversation/conversationByParticipants?participants=${participants}`,
        //         method: "GET"
        //     })
        // }),
        createOrUpdateConversationThenSlientlyCreateMessage: builder.mutation({
            query: (data: {
                payload: {
                    lastMessage: string,
                    participants: string,
                    isGroup?: boolean,
                    groupName?: string,
                    groupPhoto?: string,
                    conversationsUsers: { userId: string }[]
                }, conversationId: string | undefined
            }) => {

                return {
                    url: `/conversation/create-or-update-conversation-then-sliently-create-message`,
                    method: "POST",
                    body: data.payload
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic chache update 

                const cacheUpdateForEditConversation = dispatch(baseApi.util.updateQueryData(
                    "getMyConversations" as never,
                    null as never,
                    (draft: { data: TConversation[] }) => {
                        const allConversations: TConversation[] = draft.data;

                        // do sort participents
                        const participants = arg.payload.participants;
                        const participantsArray = participants.split('/');
                        const sortedParticipantsArray = participantsArray.sort();
                        const sortedParticipants = sortedParticipantsArray.join('/');

                        // find conversation
                        const getSelectedConversation = allConversations.find(conversation => conversation.participants === sortedParticipants)

                        if (getSelectedConversation) {
                            getSelectedConversation.lastMessage = arg.payload.lastMessage;
                            getSelectedConversation.updatedAt = new Date().toISOString();
                            draft.data = allConversations.sort((a, b) =>
                                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                            );
                        }

                    }
                ))


                const optimisticMessageUpdateInCache = dispatch(baseApi.util.updateQueryData("getMyMessagesByConversationId" as never, arg.conversationId as never, (draft: any) => {
                    const message = arg.payload.lastMessage;


                    if (draft) {
                        draft.data.push({ message, type: "text" })
                    }
                }))


                try {
                    const res: any = await queryFulfilled;
                    if (res.data.statusCode === 200) {
                        // update message cache

                        dispatch(baseApi.util.updateQueryData("getMyMessagesByConversationId" as never, arg.conversationId as never, (draft: any) => {

                            if (draft) {
                                optimisticMessageUpdateInCache.undo()
                                draft.data.push(res.data.data.message)
                            }
                        }))
                    }



                    if (res.data.statusCode === 201) {
                        dispatch(baseApi.util.updateQueryData(
                            "getMyConversations" as never,
                            null as never,
                            (draft: { data: TConversation[] }) => {
                                // find conversation
                                console.log(res);
                                draft.data.push(res.data.data.conversation)

                                draft.data = draft.data.sort((a, b) =>
                                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                                );


                            }
                        ))

                    }



                }
                catch (err) {
                    cacheUpdateForEditConversation.undo()
                    optimisticMessageUpdateInCache.undo()
                }



            }
        },
        ),

        createGroupConversationThenSlientlyCreateMessage: builder.mutation({
            query: (payload: {
                lastMessage: string,
                participants: string,
                isGroup: boolean,
                groupName?: string,
                groupPhoto?: string,
                conversationsUsers: { userId: string }[]
            }) => {

                return {
                    url: `/conversation/create-group-conversation-then-sliently-create-message`,
                    method: "POST",
                    body: payload
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const res: any = await queryFulfilled;

                if (res.data.statusCode === 201) {
                    dispatch(baseApi.util.updateQueryData(
                        "getMyConversations" as never,
                        null as never,
                        (draft: { data: TConversation[] }) => {

                            // find conversation
                            draft.data.push(res.data.data)

                            draft.data = draft.data.sort((a, b) =>
                                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                            );


                        }
                    ))
                }
            }
        },
        ),






        // updateConversationByParticipants: builder.mutation({
        //     query: (payload: { data: { lastMessage: string, groupName?: string, groupPhoto?: string }, participants: string }) => {

        //         return {
        //             url: `/conversation/updateConversationByParticipants?participants=${payload?.participants}`,
        //             method: "PUT",
        //             body: payload.data
        //         }
        //     },
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         const conversation: any = await queryFulfilled;
        //         if (conversation.data.success && conversation.data.data.id) {
        //             const payload = {
        //                 message: arg.data.lastMessage,
        //                 conversationId: conversation.data.data.id
        //             }
        //             dispatch(messageApi.createMessage.initiate(payload)).unwrap()
        //         }
        //     }
        // }),


    }),
})


export const {
    useGetMyConversationsQuery,
    useGetConversationByIdQuery,
    // useGetConversationByParticipantsQuery,
    useCreateOrUpdateConversationThenSlientlyCreateMessageMutation,
    useCreateGroupConversationThenSlientlyCreateMessageMutation,
    // useUpdateConversationByParticipantsMutation
} = conversationApi

export default conversationApi.endpoints;