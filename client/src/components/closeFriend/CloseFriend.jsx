import { useContext } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/socketContext/SocketContext";
import "./closeFriend.css";

export default function CloseFriend({ friend }) {
    const noAvatar = process.env.REACT_APP_NO_AVATAR;
    const { onlineUsers } = useContext(SocketContext);
    
    return (
        <Link to={"/profile/" + friend.username} className="link">
            <li className="closeFriend">
                <div className="closeProfileImgContainer">
                    <img className="closeProfileImg" src={friend.profilePicture || noAvatar} alt="" />
                    {onlineUsers.some(online => online === friend._id) &&
                        <div className="closeOnlineBadge"></div>}
                </div>
                <span className="closeUsername">{friend.fullName || friend.username}</span>
            </li>
        </Link>
    );
}
