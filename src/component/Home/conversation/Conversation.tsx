
import { SlOptions } from "react-icons/sl";
import { useGetMyConversationsQuery } from "../../../redux/features/conversation/conversationApi";

import ConversationHeader from "./ConversationHeader";
import { TConversation } from "./conversation.type";
import DataLoadingFromDatabase from "../../shared/DataLoadingFromDatabase";




const Conversation = () => {

    const { data, isLoading } = useGetMyConversationsQuery(null)

    const conversations: TConversation[] = data?.data;
   
    return (
        <div className="bg-white  basis-[20%] ml-9 my-10 rounded-md">

            <ConversationHeader></ConversationHeader>

            {/* input */}
            <section className="px-6 pb-4">
                <input type="text" placeholder="Search chat" className="input input-bordered input-md w-full max-w-xs bg-[#ebebeba9]" />
            </section>


            {/* all conversations */}
            {/*   ${dummyConversationData.length>8?"overflow-y-scroll":""} */}
            
             { isLoading? <DataLoadingFromDatabase></DataLoadingFromDatabase>:  <section className={`bg-red-20 max-h-[70.5vh] overflow-y-auto custom-scrollbar`}>
                    {
                        conversations?.map((data, index) =>

                            <div key={index} className="h-[5rem] bg-red-20 w-full flex justify-between px-4 items-center border-[0.5px] border-t-0 border-b-[#EBEBEB]">

                                <section className="flex gap-4 justify-center items-center">
                                    {/* avater */}
                                    <div className={`avatar `}>
                                        <div className="w-14 rounded-full">
                                            {data.isGroup ? <img src={data.groupPhoto} /> : <img src={data.receiverProfilePhoto} />}
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
                                    <SlOptions />
                                </div>

                            </div>


                        )
                    }
                </section>}
           

        </div>
    );
};

export default Conversation;