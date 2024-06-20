import { BiSolidVideo } from "react-icons/bi";
import { FaSquarePhone } from "react-icons/fa6";

import { SlOptions } from "react-icons/sl";
import { useGetConversationByIdQuery } from "../../../redux/features/conversation/conversationApi";
import { useParams } from "react-router-dom";


const MessageHeader = () => {
    const params = useParams()
    const { data } = useGetConversationByIdQuery(params?.conversationId)
    const conversation = data?.data;
    
    return (
        <section className="flex justify-between items-center">
            <div>
                <div className="flex gap-4">
                    <div className={`avatar `}>
                   {   conversation?.isGroup ?  <div className="w-14 rounded-full">
                            <img src={conversation?.groupPhoto} />
                        </div>:  
                        
                        <div className="w-14 rounded-full">
                            <img src={conversation?.receiverProfilePhoto} />
                        </div>  }   
                    </div>








                    <div>
                    { conversation?.isGroup ?   <h1 className="text-xl">{conversation?.groupName}</h1>:<h1 className="text-xl">{conversation?.receiverProfileName}</h1>}
                        <p className="text-sm">Online</p>
                    </div>
                </div>
            </div>

            {/* <BsFillCameraVideoFill /> */}

            <div className="flex gap-4 items-center justify-center">
                <FaSquarePhone className="w-12 h-12 text-[#02A470]" />
                <BiSolidVideo className="w-12 h-10 px-2 py-2 text-white rounded-lg bg-[#696969]" />
                <SlOptions className="w-12 h-10 px-2 py-2 text-white rounded-lg bg-[#696969]" />

            </div>
        </section>
    );
};

export default MessageHeader;