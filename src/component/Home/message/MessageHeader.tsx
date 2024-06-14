import { BiSolidVideo } from "react-icons/bi";
import { FaSquarePhone } from "react-icons/fa6";

import { SlOptions } from "react-icons/sl";


const MessageHeader = () => {
    return (
        <section className="flex justify-between items-center">
            <div>
                <div className="flex gap-4">
                    <div className={`avatar `}>
                        <div className="w-12 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl">Townsend Seary</h1>
                        <p className="text-sm">Online</p>
                    </div>
                </div>
            </div>

            {/* <BsFillCameraVideoFill /> */}

            <div className="flex gap-4 items-center justify-center">
            <FaSquarePhone className="w-12 h-12 text-[#02A470]" />
            <BiSolidVideo className="w-12 h-10 px-2 py-2 text-white rounded-lg bg-[#696969]" />
            <SlOptions className="w-12 h-10 px-2 py-2 text-white rounded-lg bg-[#696969]"/>
           
            </div>
        </section>
    );
};

export default MessageHeader;