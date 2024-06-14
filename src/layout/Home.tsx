import Conversation from "../component/Home/conversation/Conversation";
import Message from "../component/Home/message/Message";
import Settings from "../component/Home/settings/Settings";

const Home = () => {
    return (
        <div className={`max-h-screen h-screen w-full bg-[#EBEBEB] flex  `}>
          <Settings>
          </Settings>
          <Conversation></Conversation>
          <Message></Message>
        </div>
    );
};

export default Home;