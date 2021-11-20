import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const [user, setUser] = useState({})
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
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
                                src={user.coverPicture || "https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2FnoCover.jpg?alt=media&token=ed583c36-ec6e-471f-9bb3-2295403441cf"}
                                alt="" 
                            />
                            <img 
                                className="profileUserImg"
                                src={user.profilePicture || "https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2FnoAavatar.png?alt=media&token=383b1c0a-dc20-4c9e-8dca-b943b8f4c63d"}
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
