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
        messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
    };

    useEffect(() => {
        scrollToBottom();

    }, []);



    return (

        <section className="min-h-[76.5vh] max-h-[76.5vh] overflow-y-auto overflow-hidden custom-scrollbar mt-4 ">

            <div className="  mt-5">


                {
                    dummyMessageData.map((data: TMessage, index: number) =>
                        <section className={` flex  ${index % 2 == 0 ? "justify-end " : " justify-start"}`} >
                            {/* ${index%2===0?"text-left":"text-right"} */}




                            {/* for text message*/}
                            {data.type === "text" && <div className={`max-w-[70%] `}>
                                <p className={` 
                                ${data.message.length < 113 ? "w-max" : ""} px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD] " : " bg-[#FFFFFF] "}
                                `}
                                >{data.message}</p>
                            </div>

                            }
                            {/*   text message end */}

                            {/* for audio  */}

                            {/* {data.type === "audio" && <div className={`max-w-[70%] `}>
                                <audio className={` 
                                 px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD]" : " bg-[#FFFFFF]"}
                                `} src={data.message} controls></audio>
                            </div>

                            } */}

                            {/* audio end

                            {/* for video  */}

                            {data.type === "video" && <div className={`max-w-[70%] `}>
                                <video className={` w-96
                                 px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD]" : " bg-[#FFFFFF]"}
                                `} src={data.message} controls></video>
                            </div>
                            }

                            {/* video end */}


                            {/* for document */}
                         {/* { data.type==="document" && <iframe
                                src={data.message}
                                className="bg-red-200 w-full"

                            />} */}
                            {/* for document */}


                        </section>
                    )
                }







                <div className="" ref={messagesEndRef} > </div>
            </div>

        </section>

    );
};

export default MessageInbox;