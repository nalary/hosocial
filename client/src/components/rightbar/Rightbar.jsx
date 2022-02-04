import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import CloseFriend from "../closeFriend/CloseFriend";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { axiosInstance } from "../../config";

export default function Rightbar({ user }) {   
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const { socket, onlineUsers } = useContext(SocketContext);

    const [profileUserFriends, setProfileUserFriends] = useState([]);
    const [currentUserFriends, setCurrentUserFriends] = useState([]);    
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    const giftIcon = process.env.REACT_APP_GIFT;
    const adImg = process.env.REACT_APP_AD;
    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user])

    useEffect(() => {
        if (user?._id) {
            const getProfileUserFriends = async () => {
                try {
                    const friendsList = await axiosInstance.get("/users/friends/" + user?._id);
                    setProfileUserFriends(friendsList.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getProfileUserFriends();
        }        
    }, [user]);

    useEffect(() => {
        if (currentUser?._id) {
            const getCurrentUserFriends = async () => {
                try {
                    const friendsList =  await axiosInstance.get("/users/friends/" + currentUser?._id);
                    setCurrentUserFriends(friendsList.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getCurrentUserFriends();
        }         
    }, [currentUser]);

    const followHandler = async () => {
        try {
            if (followed) {
                await axiosInstance.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axiosInstance.put(`/users/${user._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });       
                
                socket.emit("sendNotification", {
                    senderName: currentUser.username,
                    fullName: currentUser.fullName,                    
                    receiverId: user._id,
                    type: 'follow'
                });         
            }            
        } catch (err) {
            console.log(err);
        }
        setFollowed(!followed);
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={giftIcon} alt=""/>
                    <span className="birthdayText">
                        <b>{currentUser.fullName || currentUser.username}</b> and <b>2 other friends</b> have a birthday today.
                    </span>
                </div>
                <img className="rightbarAd" src={adImg} alt=""/>
                <h4 className="rightbarTitle">Close Friends</h4>
                <ul className="rightbarFriendList">
                    {currentUserFriends.map(friend => (
                        <CloseFriend key={friend._id} friend={friend} onlineUsers={onlineUsers}/>
                    ))}              
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user?.username !== currentUser?.username && (
                    <button 
                        className={followed ? "rightbarFollowButton followed" : "rightbarFollowButton"} 
                        onClick={followHandler}
                    >                        
                        {followed ? <i className="fas fa-user-check"></i> : <i className="fas fa-user-plus"></i>}
                        {followed ? "Following" : "Follow"}
                    </button>                    
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : user.relationship === 3 ? "Complicated" : ""}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">                
                    {profileUserFriends.map(friend => (    
                        <div key={friend._id} className="rightbarFollowing">
                            <Link to={`/profile/${friend.username}`} className="link">
                            <img
                                className="rightbarFollowingImg"
                                src={friend.profilePicture || noAvatar}
                                alt="" 
                            />
                            </Link>                  
                            <span className="rightbarFollowingName">{friend.fullName || friend.username}</span>
                        </div>
                    ))}                                                           
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
