/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TbMessageShare } from "react-icons/tb";
import userApi, { useGetUsersWithoutMeForMessageQuery } from "../../../redux/features/user/userApi";
import { TUser } from "./conversation.type";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";
import conversationApi from "../../../redux/features/conversation/conversationApi";
import useCurrentUser from "../../../hooks/useCurrentUser";


const CreateNewMessage = () => {
    const [users, setUsers] = useState<TUser[]>([])
    const { data } = useGetUsersWithoutMeForMessageQuery(undefined);
    const allUsers: TUser[] = data?.data;
    const [searchTerm, setSearchTerm] = useState("")
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const dispatch = useAppDispatch()
    const loggedInUser = useCurrentUser()



    useEffect(() => {

        if (searchTerm) {
            setIsUsersLoading(true)
            dispatch(userApi.searchUsersWithoutMeForMessage.initiate(searchTerm)).unwrap().then((users) => {
                if (users.success) {
                    if (users.data.length > 0) {
                        setUsers(users.data);
                        setIsUsersLoading(false)
                    }
                    else {
                        setUsers([])
                        setIsUsersLoading(false)
                    }
                }
                else if (!users.success) {
                    toast.error(users.message)
                    setIsUsersLoading(false)
                }
            });
        }

        if (searchTerm.length === 0) {
            setIsUsersLoading(true)
            dispatch(userApi.getUsersWithoutMeForMessage.initiate(undefined)).unwrap().then((users) => {
                if (users.success) {
                    if (users.data.length > 0) {
                        setUsers(users.data);
                        setIsUsersLoading(false)
                    }
                    else {
                        setUsers([])
                        setIsUsersLoading(false)
                    }
                }
            })
        }
    }, [searchTerm])

    useEffect(() => {
        setUsers(allUsers)
    }, [allUsers])





    const showModal = () => {
        const modal = document.getElementById('new_message_modal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    const handleCreateMessage = () => {
        setError("")
        if (!selectedUserId) {
            return setError("Please select a user to start a chat.")
        }
        if (!message) {
            return setError("Please write a message to chat.")
        }

        const participants = `${loggedInUser?.id}/${selectedUserId}`;
        // find conversation exits or not
        const payload = {
            lastMessage: message,
            participants,
            conversationsUsers: [
                {
                    userId: loggedInUser!.id
                },
                {
                    userId: selectedUserId
                },
            ]
        }
        dispatch(conversationApi.createConversation.initiate(payload)).unwrap().then((res) => {
            console.log(res);
            console.log(res.success);
            console.log(res.statusCode);
        })


    }





    return (
        <div>
            <button className="" onClick={showModal}><TbMessageShare className="w-12 h-12 bg-[#E6E6E6] px-3 py-2 rounded-md" /></button>

            <dialog id="new_message_modal" className="modal">
                <div className="modal-box py-4">
                    <form method="dialog" className="flex justify-between items-center p-0 m-0">
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="text" name="text" className="w-[80%] bg-white rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-5 leading-8 transition-colors duration-200 ease-in-out" placeholder="Search user to chat" />
                        <button className="btn btn-lg btn-circle btn-ghost">✕</button>
                    </form>

                    {!isUsersLoading ?
                        <>
                            {
                                users?.length > 0 ? <section className={`bg-red-20 max-h-[50vh] h-[50vh] overflow-y-auto custom-scrollbar`}>
                                    {
                                        users.map((user) =>

                                            <div onClick={() => setSelectedUserId(user.id)} key={user.id} className={`h-[5rem] ${selectedUserId === user.id ? "bg-[#67849034]" : ""} w-full flex justify-between px-4 items-center border-[0.5px] border-t-0 border-b-[#EBEBEB]`}>

                                                <section className="flex gap-4 justify-center items-center">

                                                    <div className={`avatar `}>
                                                        <div className="w-14 rounded-full">
                                                            <img src={user.profilePhoto} />
                                                        </div>
                                                    </div>


                                                    <div className="mb-1">

                                                        <h1 className="text-xl font-semibold text-left">{user.name}</h1>


                                                        <p className="text-[14px] text-left flex gap-1"><span className="font-semibold">Joined At</span>
                                                            <p> {
                                                                new Date(user?.createdAt).toDateString()
                                                            }</p>
                                                        </p>
                                                    </div>
                                                </section>
                                                <input type="checkbox" checked={selectedUserId === user.id} className="checkbox checkbox-info" />
                                            </div>
                                        )
                                    }
                                </section> :
                                    <p className=" max-h-[50vh] h-[50vh] flex justify-center items-center">No User found</p>
                            }
                        </> : <section className="max-h-[50vh] h-[50vh] flex justify-center items-center">
                            <div className="loading loading-spinner  md:w-[5rem] w-[5rem]"></div>
                        </section>

                    }
                    <section>
                        <div className="pt-4">
                            <textarea required placeholder="Please write a message to send." onChange={(e) => setMessage(e.target.value)} id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" data-gramm="false" wt-ignore-input="true"></textarea>
                        </div>
                        {error && <p className={`text-center py-3 text-error`}>{error}</p>}
                        <button onClick={handleCreateMessage} className="text-white mt-2 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send message </button>
                    </section>




                </div>
            </dialog>
        </div>
    );
};

export default CreateNewMessage;