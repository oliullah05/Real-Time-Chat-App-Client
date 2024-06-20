import { useEffect, useRef } from "react";
import { dummyMessageData } from "./message.const";
interface TMessage {
    id: string;
    message: string;
    type: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    conversationId: string;
    senderId: string;
}
const MessageInbox = () => {

    // return (
    //     <section className="min-h-[76.5vh] max-h-[76.5vh] overflow-y-auto overflow-hidden custom-scrollbar mt-4 ">

    //        <div className="  mt-5">
    //        {
    //             dummyMessageData.slice(0, 10).map((data: TMessage, index) => 
    //             <section className={` flex  ${index % 2 == 0 ? "justify-end " : " justify-start"}`} >
    //                 {/* ${index%2===0?"text-left":"text-right"} */}
    //                 {<div className={`max-w-[70%] `}>
    //                     <p className={` 
    //                         ${data.message.length < 113 ? "w-max" : ""} px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD] " : " bg-[#FFFFFF]"}
    //                         `}


    //                         >{data.message}</p>
    //                 </div>

    //                 }
    //             </section>
    //             )
    //         }
    //        </div>

    //     </section>
    // );



    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();

    }, []);



    return (

        <section className="min-h-[76.5vh] max-h-[76.5vh] overflow-y-auto overflow-hidden custom-scrollbar mt-4 ">

            <div className="  mt-5">
                {
                    dummyMessageData.map((data: TMessage, index:number) =>
                        <section className={` flex  ${index % 2 == 0 ? "justify-end " : " justify-start"}`} >
                            {/* ${index%2===0?"text-left":"text-right"} */}
                            {<div className={`max-w-[70%] `}>
                                <p className={` 
                                ${data.message.length < 113 ? "w-max" : ""} px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD] " : " bg-[#FFFFFF]"}
                                `}


                                >{data.message}</p>
                            </div>

                            }
                        </section>
                    )
                }
                <div ref={messagesEndRef} />
            </div>

        </section>

    );
};

export default MessageInbox;