import "./topbar.css";
import { Search, Chat, Notifications, ArrowDropDown, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { useEffect } from "react";

export default function Topbar() {
    const { user, dispatch } = useContext(AuthContext);
    const { notifications: notices, dispatch: socketDispatch } = useContext(SocketContext);

    const [openSettings, setOpenSettings] = useState(false);
    const [openNotice, setOpenNotice] = useState(false);
    const [notifications, setNotifications] = useState(notices);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    useEffect(() => {
        setNotifications(notices);
    }, [notices]);

    const displayNotification = ({ senderName, fullName, type }, index) => { 
        let action;

        if (type === 'like') {
            action = "liked your post.";
        } else if (type === 'follow') {
            action = "followed you.";
        } else if (type === 'message') {
            action = "sent you a message.";
        }

        return (
            <span key={index} className="notification"><b>{fullName || senderName}</b> {action}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        socketDispatch({ type: "CLEAR_NOTIFICATIONS" });
        setOpenNotice(false);
    };
    
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="link">
                    <span className="logo">Ho.social</span>
                </Link>                
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <Link to={`/profile/${user.username}`} className="link">
                        <div className="topbarIconItem">
                            <Person />
                            {notifications.filter(notification => notification.type === 'follow').length > 0 && (
                                <span className="topbarIconBadge">
                                    {notifications.filter(notification => notification.type === 'follow').length}
                                </span>
                            )}
                        </div>
                    </Link>
                    <Link to="/messenger" className="link">
                        <div className="topbarIconItem">
                            <Chat />
                            {notifications.filter(notification => notification.type === 'message').length > 0 && (
                                <span className="topbarIconBadge">
                                    {notifications.filter(notification => notification.type === 'message').length}
                                </span>
                            )}
                        </div>
                    </Link>
                    <div className="topbarIconItem" onClick={() => setOpenNotice(!openNotice)}>
                        <Notifications />
                        {notifications.length > 0 && (
                            <span className="topbarIconBadge">
                                {notifications.length}
                            </span>
                        )}
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img 
                        className="topbarImg" 
                        src={user.profilePicture || noAvatar} 
                        alt=""
                    />                    
                </Link>
                <span className="topbarLink">{user.fullName || user.username}</span>
                <div className="profile">
                    <ArrowDropDown className="profileIcon" onClick={() => setOpenSettings(!openSettings)}/>     
                    {openSettings && (
                        <div className="options">
                            <Link to="/settings" className="link" style={{ padding: "10px"}}>
                                <span>Settings</span>
                            </Link>
                            <span onClick={() => dispatch({ type: "LOGOUT" })}>Logout</span>
                        </div> 
                    )}                    
                </div>
                {openNotice && notifications.length > 0 && (
                    <div className="notifications">
                        {notifications.map((notification, index) => displayNotification(notification, index))}
                        {notifications.length > 0 && (
                            <button className="markButton" onClick={handleRead}>Dismiss All</button>
                        )}
                    </div>
                )} 
            </div>
        </div>
    );
}
