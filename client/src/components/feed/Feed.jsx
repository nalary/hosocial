import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { axiosInstance } from "../../config";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username 
                ? await axiosInstance.get("/posts/profile/" + username)
                : await axiosInstance.get("posts/timeline/" + user._id);
            setPosts(res.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt);
            }));
        }
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map(post => (
                    <Post key={post._id} post={post} />
                ))}                
            </div>
        </div>
    );
}
