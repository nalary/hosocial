import "./message.css";
import { format } from 'timeago.js';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
    const [profilePicture, setProfilePicture] = useState("");

    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get("/users?userId=" + message.sender);
                setProfilePicture(res.data.profilePicture);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [message.sender]);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img 
                    className="messageImg"
                    src={profilePicture || noAvatar} 
                    alt=""
                 />
                 <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}
