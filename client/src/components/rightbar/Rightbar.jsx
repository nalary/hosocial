import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {   
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendsList =  await axios.get("/users/friends/" + user?._id);
                setFriends(friendsList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    const followHandler = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
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
                    <img className="birthdayImg" src="https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2Fgift.png?alt=media&token=77e00683-5c26-467b-a116-36b08ff35afe" alt=""/>
                    <span className="birthdayText">
                        <b>{currentUser.fullName || currentUser.username}</b> and <b>2 other friends</b> have a birthday today.
                    </span>
                </div>
                <img className="rightbarAd" src="https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2Fad.jpg?alt=media&token=e81dce06-86de-49a1-91e8-ab041a149453" alt=""/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user => (
                        <Online key={user.id} user={user}/>
                    ))}              
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={followHandler}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
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
                        {friends.map(friend => (    
                        <div className="rightbarFollowing">
                            <Link to={`/profile/${friend.username}`} className="link">
                            <img
                                className="rightbarFollowingImg"
                                src={friend.profilePicture || "https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2FnoAavatar.png?alt=media&token=383b1c0a-dc20-4c9e-8dca-b943b8f4c63d"}
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
