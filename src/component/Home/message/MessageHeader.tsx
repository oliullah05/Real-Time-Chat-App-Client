import React from "react";
import { BiSolidVideo } from "react-icons/bi";
import { FaSquarePhone } from "react-icons/fa6";
import groupPhotoAvater from "../../../assets/icon/groupPhotoAvater.png";
import { SlOptions } from "react-icons/sl";
import { useGetConversationByIdQuery } from "../../../redux/features/conversation/conversationApi";
import { useParams } from "react-router-dom";

const MessageHeader = () => {
  const { conversationId } = useParams();
  const { data } = useGetConversationByIdQuery(conversationId);
  const conversation = data?.data;

  return (
    <section className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="avatar">
          {conversation?.isGroup ? (
            <>
              {conversation.groupPhoto ? (
                  <section className="avatar">
                  <div className=" w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                   <img loading="lazy" src={conversation?.groupPhoto} alt="Group Photo" className="w-14 h-14 rounded-full object-cover" />
                  </div>
              </section>
               
              ) : (
                <section className="avatar">
                <div className=" w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                 <img loading="lazy" src={groupPhotoAvater} alt="Group Avatar" className="w-full h-full object-cover" />
                </div>
            </section>
                 
               
              )}
            </>
          ) : (
            <>
              {conversation?.receiverProfilePhoto ? (
              
              <section className="avatar">
              <div className=" w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <img loading="lazy" src={conversation?.receiverProfilePhoto} alt="" />
              </div>
          </section>
              ) : (
               <> 
                <section className="avatar">
                    <div className=" w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className=" text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                </section>
                </>
              )}
            </>
          )}
        </div>

        <div>
          {conversation?.isGroup ? (
            <h1 className="text-xl">{conversation?.groupName}</h1>
          ) : (
            <h1 className="text-xl">{conversation?.receiverProfileName}</h1>
          )}
          <p className="text-sm">Online</p>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <FaSquarePhone className="w-12 h-12 text-[#02A470]" />
        <BiSolidVideo className="w-12 h-10 px-2 py-2 text-white rounded-lg bg-[#696969]" />
        <SlOptions className="w-12 h-10 px-2 py-2 text-white rounded-lg bg-[#696969]" />
      </div>
    </section>
  );
};

export default MessageHeader;
