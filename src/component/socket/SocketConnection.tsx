/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../../redux/hooks';
import { baseApi } from '../../redux/api/baseApi';
import useCurrentUser from '../../hooks/useCurrentUser';
import socket from '../../lib/socket';

const SocketConnection = () => {
    const user = useCurrentUser()
    const dispatch = useAppDispatch()


    socket.on("connect", () => {
        // console.log("socket client connected", socket.id);
        socket.emit("setActiveUsers", { userId: user!.id, socketId: socket.id, userInfo: user, })

    })

    // socket.on("create-group", (data) => {
    //     console.log(data.conversation.id);
    //     dispatch(baseApi.util.updateQueryData("getMyConversations" as never, null as never, (draft: any) => {
    //        const participents:string = (data.conversation.participants);

    //        if(participents.includes(user!.id)){
    //            draft.data.push(data.conversation) 
    //        }
    //     }))
    // })


    

    useEffect(() => {
        socket.on("seeActiveUsers", (users) => {
            console.log(users);
        })
    }, [])

    return (
        <>

        </>
    );
};

export default SocketConnection;