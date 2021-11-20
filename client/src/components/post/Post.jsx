import { MoreVert } from "@material-ui/icons";
import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id});
            
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);        
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className="postProfileImg" 
                                src={user.profilePicture ? user.profilePicture : "https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2FnoAavatar.png?alt=media&token=383b1c0a-dc20-4c9e-8dca-b943b8f4c63d"} 
                                alt=""                         
                            />                            
                        </Link>
                        <span className="postFullName">{user.fullName || user.username}</span>                        
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
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
                            src="https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2Flike.png?alt=media&token=4a8da8ec-b0f2-44da-b258-9bef484b7f08"
                            alt="" 
                            onClick={likeHandler}
                        />
                        <img 
                            className="postLikeIcon" 
                            src="https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2Fheart.png?alt=media&token=3f0f79d0-0cc7-4601-b936-1256542e92b8"
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
