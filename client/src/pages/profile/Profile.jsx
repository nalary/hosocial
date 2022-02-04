import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { axiosInstance } from "../../config";

export default function Profile() {
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext);
    const { notifications, dispatch } = useContext(SocketContext);

    const username = useParams().username;

    const noAvatar = process.env.REACT_APP_NO_AVATAR;
    const noCover = process.env.REACT_APP_NO_COVER;

    useEffect(() => {
        if (notifications.filter(notification => notification.type === 'follow').length > 0) {
            dispatch({ type: "READ_NOTIFICATIONS", payload: 'follow' });
        }
    }, [dispatch, notifications]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(`/users?username=${username}`);         
                setUser(res.data);    
            } catch (err) {
                console.log(err);
                window.location.replace("/");
            }                    
        };
        fetchUser(); 
    }, [username]);    
    
    return (        
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg"
                                src={user.coverPicture || noCover}
                                alt="" 
                            />
                            {user.username === currentUser.username && 
                                <Link to="/settings" className="link">
                                    <button className="profileSettingsButton">Profile Settings</button> 
                                </Link>
                            }   
                            <img 
                                className="profileUserImg"
                                src={user.profilePicture || noAvatar}
                                alt="" 
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.fullName || user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>                                                     
                        </div>                                           
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>                    
                </div>
            </div>            
        </>
    );
}
