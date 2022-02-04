import { useEffect, useState } from "react";
import "./conversation.css";
import { axiosInstance } from "../../config";

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    useEffect(() => {
        const friendId = conversation.members.find(member => member !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axiosInstance.get("/users?userId=" + friendId);
                setUser(res.data); 
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img 
                className="conversationImg" 
                src={user?.profilePicture || noAvatar} 
                alt="" 
            />
            <span className="conversationName">{user?.fullName || user?.username}</span>
        </div>
    );
}
