import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ friend }) {
    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    return (
        <Link to={"/profile/" + friend.username} className="link">
            <li className="closeFriend">
                <div className="closeProfileImgContainer">
                    <img className="closeProfileImg" src={friend.profilePicture || noAvatar} alt="" />
                </div>
                <span className="closeUsername">{friend.fullName || friend.username}</span>
            </li>
        </Link>
    );
}
