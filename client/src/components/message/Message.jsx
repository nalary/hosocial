import "./message.css";
import { format } from 'timeago.js';

export default function Message({ message, own }) {
    const noAvatar = process.env.REACT_APP_NO_AVATAR;

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img 
                    className="messageImg"
                    src={message.senderPicture || noAvatar} 
                    alt=""
                 />
                 <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}
