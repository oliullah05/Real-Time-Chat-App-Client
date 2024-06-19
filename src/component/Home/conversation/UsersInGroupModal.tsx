import React, { useState } from "react";
import { TUser } from "./conversation.type";

const UsersInGroupModal = ({user,selectedUsersId,setSelectedUsersId}:{user:TUser,selectedUsersId:string[] |[],setSelectedUsersId:React.Dispatch<React.SetStateAction<string[]|[]>>}) => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    const handleSelectedUsers = (userId:string)=>{

  if(selectedUserId){
    setSelectedUserId(null)
    const removeUserFromSelect = selectedUsersId.filter(id=>id!==userId)
    setSelectedUsersId(removeUserFromSelect)
  }
  if(!selectedUserId){
    setSelectedUserId(userId)
    setSelectedUsersId([...selectedUsersId,userId])

  }

    }
   
    return (
        <div onClick={() => handleSelectedUsers(user.id)} key={user.id} className={`h-[5rem] ${selectedUserId === user.id ? "bg-[#67849034]" : ""} w-full flex justify-between px-4 items-center border-[0.5px] border-t-0 border-b-[#EBEBEB]`}>

        <section className="flex gap-4 justify-center items-center">

            <div className={`avatar `}>
                <div className="w-14 rounded-full">
                    <img src={user.profilePhoto} />
                </div>
            </div>


            <div className="mb-1">

                <h1 className="text-xl font-semibold text-left">{user.name}</h1>


                <p className="text-[14px] text-left flex gap-1"><span className="font-semibold">Joined At</span>
                    <p> {
                        new Date(user?.createdAt).toDateString()
                    }</p>
                </p>
            </div>
        </section>
        <input type="checkbox" checked={selectedUserId === user.id} className="checkbox checkbox-info" />
    </div>
    );
};

export default UsersInGroupModal;