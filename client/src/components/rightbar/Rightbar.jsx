import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
    
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt=""/>
                    <span className="birthdayText">
                        <b>Lika Mayer</b> and <b>2 other friends</b> have a birthday today.
                    </span>
                </div>
                <img className="rightbarAd" src="/assets/ad.jpg" alt=""/>
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
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">Bangkok</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Venus</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Complicated</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src="assets/person/lika.jpg" 
                            alt="" 
                        />
                        <span className="rightbarFollowingName">Lika Mayer</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src="assets/person/kanom.jpg" 
                            alt="" 
                        />
                        <span className="rightbarFollowingName">Kanom Fraser</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src="assets/person/mina.jpg" 
                            alt="" 
                        />
                        <span className="rightbarFollowingName">Mina Roman</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src="assets/person/linlin.jpg" 
                            alt="" 
                        />
                        <span className="rightbarFollowingName">Linlin Moses</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src="assets/person/pam.jpg" 
                            alt="" 
                        />
                        <span className="rightbarFollowingName">Pam Dennis</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            className="rightbarFollowingImg"
                            src="assets/person/ryo.jpg" 
                            alt="" 
                        />
                        <span className="rightbarFollowingName">Ryo Gregory</span>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
