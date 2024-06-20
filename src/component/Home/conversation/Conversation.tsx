import { useNavigate } from "react-router-dom";
import { useGetMyConversationsQuery } from "../../../redux/features/conversation/conversationApi";
import groupPhotoAvater from "../../../assets/icon/groupPhotoAvater.png"
import ConversationHeader from "./ConversationHeader";
import { TConversation } from "./conversation.type";
import ReactTimeAgo from "react-time-ago";
const Conversation = () => {

    const { data, isLoading } = useGetMyConversationsQuery(null)

    const conversations: TConversation[] = data?.data;
    const navigate = useNavigate()
    return (
        <div className="bg-white  basis-[20%] ml-9 my-10 rounded-md">

            <ConversationHeader></ConversationHeader>

            {/* input */}
            <section className="px-6 pb-4">
                <input type="text" placeholder="Search chat" className="input input-bordered input-md w-full max-w-xs bg-[#ebebeba9]" />
            </section>


            {/* all conversations */}

            {isLoading ? <section className=" h-[70.5vh] flex justify-center items-center">
                <div className="loading loading-spinner  md:w-[5rem] w-[5rem]"></div>
            </section> :
                <section className={`bg-red-20 max-h-[70.5vh] overflow-y-auto custom-scrollbar`}>
                    {
                        conversations?.map((data) =>

                            <div onClick={() => navigate(`/inbox/${data.id}`)} key={data.id} className="h-[5rem]  w-full flex justify-between px-4 items-center border-[0.5px] border-t-0 border-b-[#EBEBEB]">

                                <section className="flex gap-4 justify-center items-center">
                                    {/* avater */}
                                    <div className={`avatar `}>
                                        <div className="w-14 rounded-full">
                                            {data.isGroup ?
                                            
                                            <> {data.groupPhoto !== null ?
                                                        <img src={data.groupPhoto} alt="Receiver Profile" /> :
                                                       <section className="avatar">
                                                         <img src={groupPhotoAvater} alt="" />
                                                       </section>
                                                    } </> :

                                                <>
                                                   
                                                    {data.receiverProfilePhoto !== null ?
                                                        <img src={data.receiverProfilePhoto} alt="Receiver Profile" /> :
                                                       <section className="avatar">
                                                         <div className=" w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                            <svg className=" text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                                        </div>
                                                       </section>
                                                    }
                                                </>

                                            }
                                        </div>
                                    </div>

                                    {/* name and last message */}
                                    <div className="mb-1">
                                        {
                                            data.isGroup ? <h1 className="text-xl font-semibold">{data.groupName}</h1> : <h1 className="text-xl font-semibold">{data.receiverProfileName}</h1>
                                        }

                                        <p className="text-[14px]">{data.lastMessage}</p>
                                    </div>
                                </section>

                                {/*  */}
                                <div>
                                    {/* <SlOptions /> */}
                                    <ReactTimeAgo date={data.updatedAt} locale="en-US" />
                                </div>

                            </div>


                        )
                    }
                </section>
            }


        </div>
    );
};

export default Conversation;