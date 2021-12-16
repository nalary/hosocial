import "./sidebar.css";
import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from "@material-ui/icons";
import RecommendFriend from "../recommendFriend/RecommendFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
    const [recommendFriends, setRecommendFriends] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getRecommendFriends = async () => {
        try {
            const res = await axios.get("/users/recommend/" + currentUser._id);
            setRecommendFriends(res.data);
        } catch (err) {
            console.log(err);
        }
        };
        getRecommendFriends();
    }, [currentUser._id]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    {showMore && 
                        <li className="sidebarListItem">
                            <HelpOutline className="sidebarIcon"/>
                            <span className="sidebarListItemText">Questions</span>
                        </li>
                    }
                    {showMore &&
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon"/>
                            <span className="sidebarListItemText">Jobs</span>
                        </li>
                    }
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    {showMore && 
                        <li className="sidebarListItem">
                            <School className="sidebarIcon"/>
                            <span className="sidebarListItemText">Courses</span>
                        </li> 
                    }
                </ul>
                <button className="sidebarButton" onClick={() => setShowMore(!showMore)}>Show More</button>
                <hr className="sidebarHr" />
                <h4 className="sidebarTitle">Recommend Friends</h4>
                <ul className="sidebarFriendList">
                    {recommendFriends.map(friend => (
                        <RecommendFriend key={friend._id} friend={friend}/>
                    ))}                    
                </ul>
            </div>
        </div>
    );
}
