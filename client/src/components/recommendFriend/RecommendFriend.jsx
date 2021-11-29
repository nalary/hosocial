import { Link } from "react-router-dom";
import "./recommendFriend.css";

export default function recommendFriend({ friend }) {
    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    return (
        <Link to={"/profile/" + friend.username} className="link">
            <li className="recommendFriend">
                <div className="recommendProfileImgContainer">
                    <img className="recommendProfileImg" src={friend.profilePicture || noAvatar} alt="" />
                </div>
                <span className="recommendUsername">{friend.fullName || friend.username}</span>
            </li>
        </Link>
    );
}
