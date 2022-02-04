import SocketReducer from "./SocketReducer";
import { createContext, useContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from "../authContext/AuthContext";

const INITIAL_STATE = {
    onlineUsers: [],
    notifications: [],
    message: "",
    socket: io("https://hosocial-socket.herokuapp.com") || null,
};

export const SocketContext = createContext(INITIAL_STATE);

export const SocketContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [state, dispatch] = useReducer(SocketReducer, INITIAL_STATE);

    useEffect(() => {
        state.socket.emit("addUser", user?._id);      

        state.socket.on("getUsers", onlineUsers => {
            dispatch({ 
                type: "ONLINE_USERS", 
                payload: user?.followings.filter(following => onlineUsers.some(user => user.userId === following)), 
            });
            console.log("getUsers");
        });
    }, [user, state.socket]);

    useEffect(() => {
        state.socket.on('userLeft', onlineUsers => {
            dispatch({ 
                type: "ONLINE_USERS", 
                payload: user?.followings.filter(following => onlineUsers.some(user => user.userId === following)), 
            });
            console.log("userLeft");
        });
    }, [user, state.socket]);

    useEffect(() => {
        state.socket.on("getMessage", data => {
            dispatch({
                type: "ARRIVAL_MESSAGE",
                payload: {
                    sender: data.senderId,
                    senderPicture: data.senderPicture,
                    text: data.text,                
                    createdAt: Date.now()
                },
            });            
            console.log("getMessage");
        });
    }, [state.socket]);

    useEffect(() => {
        state.socket.on("getNotification", data => {    
            dispatch({ type: "ADD_NOTIFICATION", payload: data });
            console.log("on getNotification");
        });
    }, [state.socket]);

    return(
        <SocketContext.Provider
            value={{ 
                onlineUsers: state.onlineUsers, 
                notifications: state.notifications, 
                message: state.message,
                socket: state.socket,
                dispatch
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};