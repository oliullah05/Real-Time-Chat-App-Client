/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCurrentUser from "../../../hooks/useCurrentUser";
import conversationApi from "../../../redux/features/conversation/conversationApi";
import userApi, { useGetUsersWithoutMeForMessageQuery } from "../../../redux/features/user/userApi";
import { useAppDispatch } from "../../../redux/hooks";
import UsersInGroupModal from "./UsersInGroupModal";
import { TUser } from "./conversation.type";

const selectedUserId = "b89bd333-e286-47db-9034-ffd35338a9ea"
const CreateNewMessage = () => {
    const [users, setUsers] = useState<TUser[]>([])
    const { data } = useGetUsersWithoutMeForMessageQuery(undefined);
    const allUsers: TUser[] = data?.data;
    const [searchTerm, setSearchTerm] = useState("")
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [selectedUsersId, setSelectedUsersId] = useState<string[] | []>([])
    const [groupName, setGroupName] = useState<string | null>("")
    const [isImgUploadLoading, setIsImageUploadLoading] = useState(false)
    const [groupPhoto, setGroupPhoto] = useState<string | null>(null)
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
        const modal = document.getElementById('new_group_modal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };



    const handleProfilePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file || file.length === 0) return;
        setIsImageUploadLoading(true)
        const form = new FormData();
        form.set("image", file[0]);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: "POST",
                body: form
            });

            if (!res.ok) {
                setIsImageUploadLoading(false)
                toast.error('Image upload failed');
            }

            const data = await res.json();
            if (data?.data?.display_url) {
                toast.success("Image upload successfully")
                setGroupPhoto(data?.data?.display_url);
            }
            setIsImageUploadLoading(false)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

   


    const handleCreateMessage = () => {
        setError("")
        if (!selectedUserId) {
            return setError("Please select a user to start a chat.")
        }
        if (!groupName) {
            return setError("Please enter a valid group name.")
        }
        if (!message) {
            return setError("Please write a message to chat.")
        }
        if (selectedUsersId.length < 2) {
            return setError("Please select at least 2 user to chat")
        }


        const selectedParticipants = selectedUsersId.join('/');
        const participants = `${loggedInUser!.id}/${selectedParticipants}`

        const conversationsUsers: { userId: string }[] = []
        participants.split('/').forEach(id => {
            if (id) {
                conversationsUsers.push({ userId: id })
            }
        });

        const payload: {
            lastMessage: string,
            participants: string,
            isGroup: boolean,
            groupName?: string,
            groupPhoto?: string,
            conversationsUsers: { userId: string }[]
        } = {
            lastMessage: message,
            isGroup: true,
            participants,
            conversationsUsers
        }
        if (groupName) {
            payload.groupName = groupName;
        }
        if (groupPhoto) {
            payload.groupPhoto = groupPhoto
        }




        dispatch(conversationApi.createGroupConversationThenSlientlyCreateMessage.initiate(payload)).unwrap().then((res) => {
            if (res.statusCode === 201) {
                toast.success("Group created successfully")
                
            }

        }).catch((err: any) => {

            if (!err.data.success) {
                setError(err.data.message)
            }
        })






    }





    return (
        <div>
            <button className="" onClick={showModal}><HiUserGroup className="w-12 h-12 bg-[#E6E6E6] px-3 py-2 rounded-md btn" /></button>

            <dialog id="new_group_modal" className="modal">
                <div className="modal-box py-4">
                    <form method="dialog" className="flex justify-between items-center p-0 m-0">
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="text" name="text" className="w-[80%] bg-white rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-5 leading-8 transition-colors duration-200 ease-in-out" placeholder="Search user to chat" />
                        <button className="btn btn-lg btn-circle btn-ghost">✕</button>
                    </form>

                    {!isUsersLoading ?
                        <>
                            {
                                users?.length > 0 ? <section className={`bg-red-20 max-h-[40vh] h-[40vh] overflow-y-auto custom-scrollbar`}>
                                    {
                                        users.map((user) =>

                                            <UsersInGroupModal key={user.id} user={user} selectedUsersId={selectedUsersId} setSelectedUsersId={setSelectedUsersId}></UsersInGroupModal>
                                        )
                                    }
                                </section> :
                                    <p className=" max-h-[40vh] h-[40vh] flex justify-center items-center">No User found</p>
                            }
                        </> : <section className="max-h-[40vh] h-[40vh] flex justify-center items-center">
                            <div className="loading loading-spinner  md:w-[5rem] w-[5rem]"></div>
                        </section>

                    }
                    <section>
                        <div className="pt-4 text-left">
                            <div className="">
                                <label htmlFor="groupName" className="leading-7 block text-base-content ">Group Name</label>
                                <input onChange={(e) => setGroupName(e.target.value)} type="text" placeholder="Please give a group name" id="groupName" name="groupName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-12 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" data-gramm="false" wt-ignore-input="true"></input>
                            </div>







                            <div className={`form-control w-full`}>
                                <label htmlFor='profilePhoto' className="leading-7 ">
                                    <span className={" text-base-content "}>Profile Photo</span>
                                </label>
                                {isImgUploadLoading ? <span className="loading loading-dots loading-lg"></span> : <input onChange={handleProfilePhotoUpload} multiple={false} accept="image/*" name='profilePhoto' id='profilePhoto' type="file" className="file-input file-input-bordered w-full " />}
                            </div>


















                            <div>
                                <label htmlFor="message" className="leading-7 block  text-gray-600">Message</label>
                                <textarea onChange={(e) => setMessage(e.target.value)} id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" data-gramm="false" wt-ignore-input="true"></textarea>
                            </div>
                        </div>
                        {error && <p className={`text-center py-3 text-error`}>{error}</p>}
                        <button disabled={isImgUploadLoading} onClick={handleCreateMessage} className="text-white bg-indigo-500 border-0 mt-2 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">{isImgUploadLoading?"Uploading...":"Send message"}</button>
                    </section>




                </div>
            </dialog>
        </div>
    );
};

export default CreateNewMessage;