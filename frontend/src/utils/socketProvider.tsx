import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
// const URL = `http://localhost:8000`;
const prodURL = import.meta.env.VITE_BASE_URL as string;
const URL = import.meta.env.VITE_BASE_URL as string;


const getServerUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return prodURL;
    } else {
        return URL;
    }
};


const SocketContext = createContext<Socket | null>(null);

// SocketProvider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize the socket using useMemo
    const socket = React.useMemo(() => io(getServerUrl(), {
        transports: ["websocket", "polling"],
        withCredentials: true
    }), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};


export const useSocket = () => {
    const socket = React.useContext(SocketContext);
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return socket;
}