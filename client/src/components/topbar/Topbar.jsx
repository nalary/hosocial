import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const { user } = useContext(AuthContext);

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
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">2</span>
                    </div>                
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">4</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img 
                        className="topbarImg" 
                        src={user.profilePicture || "https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2FnoAavatar.png?alt=media&token=383b1c0a-dc20-4c9e-8dca-b943b8f4c63d"} 
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
}
