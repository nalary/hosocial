import { useContext, useRef, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./settings.css";
import { updateCall } from "../../apiCalls";
import upload from "../../upload";
import { axiosInstance } from "../../config";

export default function Settings() {
    const { user, dispatch } = useContext(AuthContext);

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const fullNameRef = useRef();
    const descRef = useRef();
    const cityRef = useRef();
    const fromRef = useRef();
    const relationshipRef = useRef();

    const [userImg, setUserImg] = useState(null);
    const [coverImg, setCoverImg] = useState(null);
    const [success, setSuccess] = useState(false);

    const noAvatar = process.env.REACT_APP_NO_AVATAR;
    const noCover = process.env.REACT_APP_NO_COVER;

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/users/${user._id}`, {
                data: {userId : user._id}
            });
            dispatch({ type: "LOGOUT" });
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }     
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            fullName: fullNameRef.current.value, 
            desc: descRef.current.value,
            city: cityRef.current.value,
            from: fromRef.current.value,
            relationship: relationshipRef.current.value,
            userId: user._id         
        };

        let images = [];
        userImg && images.push({ file: userImg, label: "profilePicture" });
        coverImg && images.push({ file: coverImg, label: "coverPicture" });

        if (images) {
            const promises = [];
            images.forEach((image) => {
                promises.push(upload(image, updatedUser, "users"));
            });
        
            Promise.all(promises).then(() => {
                updateCall(updatedUser, user._id, dispatch);
            });
        } else {
            updateCall(updatedUser, user._id, dispatch);
            
        } 
        setSuccess(true);
    };

    return (
        <>
            <Topbar />
            <div className="settings">
                <Sidebar />
                <div className="settingsWrapper">                    
                    <form className="settingsForm" onSubmit={handleSubmit}>
                        <div className="settingsCover">
                            <img 
                                className="settingsCoverImg"
                                src={coverImg ? URL.createObjectURL(coverImg) : user.coverPicture || noCover}
                                alt="" 
                            />
                            <div className="settingsCoverIconWrapper">
                                <label htmlFor="coverImgInput">
                                    <i className="settingsCoverIcon fas fa-image"></i>
                                </label>
                            </div>
                            <input 
                                type="file" 
                                id="coverImgInput"
                                // name="coverImgInput" 
                                style={{display: "none"}}
                                onChange={e => setCoverImg(e.target.files[0])}
                            />                           
                            <img 
                                className="settingsUserImg"
                                src={userImg ? URL.createObjectURL(userImg) : user.profilePicture || noAvatar}
                                alt="" 
                            />                        
                            <input 
                                type="file" 
                                id="userImgInput"
                                // name="userImgInput"
                                style={{display: "none"}} 
                                onChange={e => setUserImg(e.target.files[0])} 
                            />                            
                        </div>
                        <div className="settingsUserIconWrapper">
                            <label htmlFor="userImgInput">
                                <i className="settingsUserIcon far fa-user-circle"></i>
                            </label>
                        </div>

                        <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
                        
                        <div className="settingsInputWrapper">
                            <div className="settingsInput">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    defaultValue={user.username}
                                    ref={usernameRef}
                                    required
                                />
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    defaultValue={user.email} 
                                    ref={emailRef}
                                    required
                                />
                                <label>Password</label>
                                <input 
                                    type="password"
                                    ref={passwordRef}
                                    required
                                />                                
                            </div>
                            <div className="settingsInput">
                                <label>Full Name</label>
                                <input 
                                    type="text"
                                    defaultValue={user.fullName}
                                    ref={fullNameRef}
                                />
                                <label>Description</label>
                                <textarea 
                                    type="text"
                                    defaultValue={user.desc}
                                    ref={descRef}
                                />
                            </div>
                            <div className="settingsInput">
                                <label>City</label>
                                <input 
                                    type="type"
                                    defaultValue={user.city}
                                    ref={cityRef}
                                />
                                <label>From</label>
                                <input 
                                    type="text"
                                    defaultValue={user.from}
                                    ref={fromRef}
                                />
                                <label>Relationship</label>
                                <select ref={relationshipRef}>
                                    <option value="1">Single</option>
                                    <option value="2">Married</option>
                                    <option value="3">Complicated</option>
                                </select>
                            </div>
                               
                        </div>
                        <button className="settingsSubmit" type="submit">Update</button>       
                        <div className="settingsInfo">
                            
                        </div>    
                        {success && <span style={{ color: "teal", textAlign: "center", marginTop: "20px" }}>Profile has been updated.</span>}                     
                        
                    </form>                                                        
                </div>
            </div>            
        </>
    )
}
