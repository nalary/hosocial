import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

export default function Profile() {
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
                                src="assets/cover.jpg" 
                                alt="" 
                            />
                            <img 
                                className="profileUserImg"
                                src="assets/person/jaoh.jpg" 
                                alt="" 
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Jaoh Campbell</h4>
                            <span className="profileInfoDesc">
                                But when you see me, you need no words beautiful people.
                            </span>
                        </div>                      
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile />
                    </div>                    
                </div>
            </div>            
        </>
    );
}
