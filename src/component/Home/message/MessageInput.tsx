
import React, { useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { FaMicrophone, FaPaperclip } from "react-icons/fa6";

const MessageInput: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log("Files uploaded:", files[0]);
            // Process the files as needed
        }
    };

    return (
        <section className="py-2 relative">
            <input 
                type="text" 
                placeholder="Write a message" 
                className="h-[4rem] focus:outline-none rounded-md p-6 w-full bg-[#FFFFFF]" 
            />

            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
            />

            <button
                type="button"
                className="absolute inset-y-0 right-1 flex items-center px-2 text-gray-500"
            >
                <div className="flex gap-3">
                    <FaPaperclip 
                        className="w-10 h-10 px-2 py-3 text-[#212529e3] rounded-lg bg-[#e6e6e6c0]" 
                        onClick={handleFileIconClick} 
                    />
                    <FaMicrophone 
                        className="w-10 h-10 px-2 py-3 text-[#212529e3] rounded-lg bg-[#e6e6e6c0]" 
                    />
                    <BsFillSendFill 
                        className="w-10 h-10 px-2 py-3 text-white rounded-lg bg-[#269A54]" 
                    />
                </div>
            </button>
        </section>
    );
};

export default MessageInput;

