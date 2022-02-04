import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { axiosInstance } from "../../config";

export default function Messenger() {
    const { user } = useContext(AuthContext);
    const { socket, onlineUsers, notifications, message: msg ,dispatch } = useContext(SocketContext);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(msg);

    const scrollRef = useRef();

    useEffect(() => {
        if (notifications.filter(notification => notification.type === 'message').length > 0) {
            dispatch({ type: "READ_NOTIFICATIONS", payload: 'message' });
        }
    }, [dispatch, notifications]);

    useEffect(() => {
        setArrivalMessage(msg);
    }, [msg]);

    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) && 
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axiosInstance.get("/conversations/" + user?._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id, arrivalMessage]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axiosInstance.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            senderPicture: user.profilePicture,
            text: newMessage
        }

        const receiverId = currentChat.members.find(member => member !== user._id);
        socket.emit("sendMessage", {
            senderId: user._id,
            senderPicture: user.profilePicture,
            receiverId,
            text: newMessage
        });

        socket.emit("sendNotification", {
            senderName: user.username,
            fullName: user.fullName,
            receiverId: receiverId,
            type: 'message'
        });

        try {
            const res = await axiosInstance.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <Topbar socket={socket}/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        {conversations.map(conversation => (
                            <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                                <Conversation conversation={conversation} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((message, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message
                                                message={message} 
                                                own={message.sender === user._id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea 
                                        className="chatMessageInput" 
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to start a chat.</span>
                        )}                        
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline 
                            onlineUsers={onlineUsers} 
                            currentUserId={user._id}
                            setCurrentChat={setCurrentChat}
                            setConversations={setConversations}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
