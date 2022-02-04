import { MoreVert } from "@material-ui/icons";
import "./post.css";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { axiosInstance } from "../../config";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;
    const likeIcon = process.env.REACT_APP_LIKE;
    const heartIcon = process.env.REACT_APP_HEART;

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        try {
            await axiosInstance.put(`/posts/${post._id}/like`, {userId: currentUser._id});
            
        } catch (err) {

        }

        if (!isLiked) {
            socket.emit("sendNotification", {
                senderName: currentUser.username,
                fullName: currentUser.fullName,
                receiverId: post.userId,
                type: 'like'
            });
            console.log("sendNotification");
        }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <Link to={`/profile/${user.username}`} className="link">
                        <div className="postTopLeft">
                            <img
                                className="postProfileImg" 
                                src={user.profilePicture ? user.profilePicture : noAvatar} 
                                alt=""                         
                            /> 
                            <span className="postFullName">{user.fullName || user.username}</span>                         
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                    </Link>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img 
                        className="postImg"
                        src={post.img} 
                        alt=""
                    />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img 
                            className="postLikeIcon" 
                            src={likeIcon}
                            alt="" 
                            onClick={likeHandler}
                        />
                        <img 
                            className="postLikeIcon" 
                            src={heartIcon}
                            alt="" 
                            onClick={likeHandler}
                        />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <div className="postCommentText">{post.comment} comments</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
