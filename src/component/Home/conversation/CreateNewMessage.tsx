/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TbMessageShare } from "react-icons/tb";
import userApi, { useGetUsersWithoutMeForMessageQuery } from "../../../redux/features/user/userApi";
import { TUser } from "./conversation.type";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";


const CreateNewMessage = () => {
    const [users, setUsers] = useState<TUser[]>([])
    const { data } = useGetUsersWithoutMeForMessageQuery(undefined);
    const allUsers: TUser[] = data?.data;
    const [searchTerm, setSearchTerm] = useState("")

    const dispatch = useAppDispatch()

    useEffect(() => {

        if (searchTerm) {
            dispatch(userApi.searchUsersWithoutMeForMessage.initiate(searchTerm)).unwrap().then((users) => {
                if (users.success) {
                    if (users.data.length > 0) {
                        setUsers(users.data);
                    }
                    else {
                        setUsers([])
                    }
                }
                else if (!users.success) {
                    toast.error(users.message)
                }
            });
        }

        if (searchTerm.length === 0) {
            dispatch(userApi.getUsersWithoutMeForMessage.initiate(undefined)).unwrap().then((users) => {
                if (users.success) {
                    if (users.data.length > 0) {
                        setUsers(users.data);
                    }
                    else {
                        setUsers([])
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

    console.log(users);

    return (
        <div>
            <button className="" onClick={showModal}><TbMessageShare className="w-12 h-12 bg-[#E6E6E6] px-3 py-2 rounded-md" /></button>

            <dialog id="new_message_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog" className="flex justify-between items-center p-0 m-0">
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="text" name="text" className="w-[80%] bg-white rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-5 leading-8 transition-colors duration-200 ease-in-out" placeholder="Search user to chat" />
                        <button className="btn btn-lg btn-circle btn-ghost">✕</button>
                    </form>

                    {users?.length > 0 ? <section className={`bg-red-20 max-h-[50vh] h-[50vh] overflow-y-auto custom-scrollbar`}>
                        {
                            users.map((data) =>

                                <div key={data.id} className="h-[5rem] bg-red-20 w-full flex justify-between px-4 items-center border-[0.5px] border-t-0 border-b-[#EBEBEB]">

                                    <section className="flex gap-4 justify-center items-center">

                                        <div className={`avatar `}>
                                            <div className="w-14 rounded-full">
                                                <img src={data.profilePhoto} />
                                            </div>
                                        </div>


                                        <div className="mb-1">

                                            <h1 className="text-xl font-semibold text-left">{data.name}</h1>


                                            <p className="text-[14px] text-left flex gap-1"><span className="font-semibold">Joined At</span>
                                                <p> {
                                                    new Date(data?.createdAt).toDateString()
                                                }</p>
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            )
                        }
                    </section> :
                        <p className=" max-h-[50vh] h-[50vh] flex justify-center items-center">No User found</p>}



                    <section>
                        <div className="py-4">
                            <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" data-gramm="false" wt-ignore-input="true"></textarea>
                        </div>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send message</button>
                    </section>




                </div>
            </dialog>
        </div>
    );
};

export default CreateNewMessage;