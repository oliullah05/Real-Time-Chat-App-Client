
import ConversationHeader from "./ConversationHeader";
import { dummyConversationData } from "./conversation.const";

import { SlOptions } from "react-icons/sl";




const Conversation = () => {
    return (
        <div className="bg-white  basis-[20%] ml-9 my-10 rounded-md">

            <ConversationHeader></ConversationHeader>

            {/* input */}
            <section className="px-6 pb-4">
                <input type="text" placeholder="Search chat" className="input input-bordered input-md w-full max-w-xs bg-[#ebebeba9]" />
            </section>


            {/* all conversations */}
{/*   ${dummyConversationData.length>8?"overflow-y-scroll":""} */}
            <section className={`bg-red-20 max-h-[70.5vh] overflow-y-auto
              
                `
                }>
                {
                    dummyConversationData.slice(0, 9).map((data, index) =>  <div key={index} className="h-[5rem] bg-red-20 w-full flex justify-around items-center border-[0.5px] border-t-0 border-b-[#EBEBEB]">

                            {/* avater */}
                            <div className={`avatar ${index === 0 ? "online" : ""} `}>
                                <div className="w-14 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>

                            {/* name and last message */}
                            <div className="mb-1">
                                <h1 className="text-xl font-semibold">{data.name}</h1>
                                <p className="text-[14px]">What's up, how are you?</p>
                            </div>

                            {/*  */}
                            <div>
                                <SlOptions />
                            </div>

                        </div>
                       
                   )
                }
            </section>

        </div>
    );
};

export default Conversation;