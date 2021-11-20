import { EmojiEmotions, Label, PermMedia, Room, Cancel } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { shareCall } from "../../apiCalls";

export default function Share() {
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        if (file) {
            const fileName = file.name + "_" + Date.now();
            const storage = getStorage(app);
            const storageRef = ref(storage, `social/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {                    
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                    }
                }, 
                (error) => {
                    console.log(error);
                }, 
                () => {                    
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {                    
                        newPost.img = downloadURL;
                        shareCall(newPost);
                    });
                }
            );
            
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
                        src={user.profilePicture || "https://firebasestorage.googleapis.com/v0/b/mern-blog-4c8dc.appspot.com/o/social%2FnoAavatar.png?alt=media&token=383b1c0a-dc20-4c9e-8dca-b943b8f4c63d"}
                        alt=""
                    />
                    <input 
                        placeholder={`What's in your mind, ${user.fullName || user.username} ?`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg"/>
                        <Cancel className="shareImgCancel" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png, .jpeg, .jpg" 
                                onChange={(e) => setFile(e.target.files[0])}
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
