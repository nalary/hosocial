import { EmojiEmotions, Label, PermMedia, Room, Cancel } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import { shareCall } from "../../apiCalls";
import upload from "../../upload";

export default function Share() {
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [shareImg, setShareImg] = useState(null);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        let image = {};
        shareImg && (image = { file: shareImg, label: "img"});

        if (image) {
            upload(image, newPost, "posts").then(() => {
                shareCall(newPost);
            });
        } else {
            shareCall(newPost);
        }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.profilePicture || noAvatar}
                        alt=""
                    />
                    <input 
                        placeholder={`What's in your mind, ${user.fullName || user.username} ?`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {shareImg && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(shareImg)} alt="" className="shareImg"/>
                        <Cancel className="shareImgCancel" onClick={() => setShareImg(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="shareImg" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="shareImg" 
                                accept=".png, .jpeg, .jpg" 
                                onChange={(e) => setShareImg(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
}
