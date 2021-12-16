import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentUserId, setCurrentChat, setConversations }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get("/users/friends/" + currentUserId);
                setFriends(res.data);
            } catch (err) {
                console.log(err);
            }            
        };
        getFriends();
    }, [currentUserId]);

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers]);
    
    const handleClick = async (friend) => {
        try {
            const getResponse = await axios.get(`/conversations/find/${currentUserId}/${friend._id}`);
            if (!getResponse.data) {
                const newConversation = {
                    senderId: currentUserId, 
                    receiverId: friend._id
                };
                const postResponse = await axios.post("/conversations", newConversation); 
                setCurrentChat(postResponse.data);
                setConversations((prev) => [...prev, postResponse.data]);
            } else {
                setCurrentChat(getResponse.data);
            }            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chatOnline">                           
            {friends.map(friend => (
                <div key={friend._id} className="chatOnlineFriend" onClick={() => handleClick(friend)}> 
                    <div className="chatOnlineImgContainer">
                        <img 
                            src={friend.profilePicture || noAvatar}
                            alt="" 
                            className="chatOnlineImg" 
                        />
                        {onlineFriends.some(online => online._id === friend._id) && <div className="chatOnlineBadge"></div>}                                            
                    </div>                               
                    <span className="chatOnlineName">{friend.fullName || friend.username}</span>
                </div>
            ))} 
        </div>
    );
}
