import { MoreVert } from "@material-ui/icons";
import "./post.css";
import { Users } from "../../dummyData.js";
import { useState } from "react";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg" 
                            src={Users.filter(user => user.id === post.userId)[0].profilePicture} 
                            alt=""                         
                        />
                        <span className="postUsername">{Users.filter(user => user.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter"></div>
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img 
                        className="postImg"
                        src={post.photo} 
                        alt=""
                    />
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img 
                            className="postLikeIcon" 
                            src="/assets/like.png" 
                            alt="" 
                            onClick={likeHandler}
                        />
                        <img 
                            className="postLikeIcon" 
                            src="/assets/heart.png" 
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
