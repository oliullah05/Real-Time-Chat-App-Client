/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../../redux/hooks';
import { baseApi } from '../../redux/api/baseApi';
import useCurrentUser from '../../hooks/useCurrentUser';

const SocketConnection = () => {
    const user = useCurrentUser()
    const socket = useMemo(() => {
        return io("http://localhost:3000")
    }, [])
    
    const dispatch = useAppDispatch()
    useEffect(() => {
        socket.on("connect", () => {
            console.log("socket client connected", socket.id);
        })
        socket.on("create-group", (data) => {
            console.log(data.conversation.id);
            dispatch(baseApi.util.updateQueryData("getMyConversations" as never, null as never, (draft: any) => {
               const participents:string = (data.conversation.participants);

               if(participents.includes(user!.id)){
                   draft.data.push(data.conversation) 
               }
            }))
        })






        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <>

        </>
    );
};

export default SocketConnection;