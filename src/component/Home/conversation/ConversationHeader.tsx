/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiUserGroup } from "react-icons/hi2";
import CreateNewMessage from "./CreateNewMessage";

const ConversationHeader = () => {




   

    return (
        <section className="flex justify-between items-center mb-8 p-6">
            <div>
                <p title="plo" className="text-3xl text-black font-semibold">Chats</p>
            </div>

            <div className="flex gap-4">

                <div className="tooltip" data-tip="New Group">
                    <HiUserGroup className="w-12 h-12 bg-[#E6E6E6] px-3 py-2 rounded-md btn" />
                </div>
                <div className="tooltip" data-tip="New Message">
                    <CreateNewMessage></CreateNewMessage>
                </div>
            </div>

            
        </section>
    );
};

export default ConversationHeader;