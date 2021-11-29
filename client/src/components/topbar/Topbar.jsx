import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const { user } = useContext(AuthContext);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="link">
                    <span className="logo">Blue.social</span>
                </Link>                
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                {/* <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div> */}
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">2</span>
                    </div>                
                    <Link to="/messenger" className="link">
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">3</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">4</span>
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
            </div>
        </div>
    );
}
