import { Outlet } from "react-router-dom";
import Conversation from "../component/Home/conversation/Conversation";
import Settings from "../component/Home/settings/Settings";

const Home = () => {
    return (
        <div className={`max-h-screen h-screen w-full bg-[#EBEBEB] flex  `}>
          <Settings>
          </Settings>
          <Conversation></Conversation>
          <Outlet></Outlet>
        </div>
    );
};

export default Home;