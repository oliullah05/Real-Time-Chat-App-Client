import { useEffect } from "react";
import useCurrentUser from '../../hooks/useCurrentUser';
import socket from '../../lib/socket';
import { useAppDispatch } from '../../redux/hooks';

const SocketConnection = () => {
    const user = useCurrentUser();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) return;

        socket.connect();

        socket.on("connect", () => {
            console.log("Socket client connected", socket.id);
            socket.emit("setActiveUsers", { userId: user.id, socketId: socket.id, userInfo: user });

        });

        // Listening for incoming messages
        socket.on("sendMessage", (message) => {
            console.log("Received message:", message);
        });

        return () => {
            socket.off("connect");
        };
    }, [user]);

    return null;
};

export default SocketConnection;
