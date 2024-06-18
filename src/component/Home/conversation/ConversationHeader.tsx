
import CreateNewMessage from "./CreateNewMessage";
import CreateNewGroup from "./CreateNewGroup";

const ConversationHeader = () => {




   

    return (
        <section className="flex justify-between items-center mb-8 p-6">
            <div>
                <p title="plo" className="text-3xl text-black font-semibold">Chats</p>
            </div>

            <div className="flex gap-4">

                <div className="tooltip" data-tip="New Group">
                    <CreateNewGroup></CreateNewGroup>
                </div>
                <div className="tooltip" data-tip="New Message">
                    <CreateNewMessage></CreateNewMessage>
                </div>
            </div>

            
        </section>
    );
};

export default ConversationHeader;