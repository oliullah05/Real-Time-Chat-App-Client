import MessageHeader from "./MessageHeader";
import MessageInbox from "./MessageInbox";
import MessageInput from "./MessageInput";

const Message = () => {
    return (
        <div className='mt-10 px-8  basis-9/12 max-w-full'>
            <MessageHeader></MessageHeader>
             <MessageInbox></MessageInbox>
            <MessageInput></MessageInput>

        </div>
    );
};

export default Message;