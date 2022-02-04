import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./register.css";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match.")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };

            try {                
                await axiosInstance.post("/auth/register", user);
                // all for router-react-dom v6
                // change useHistory to useNavigate
                navigate("/login");
            } catch (err) {
                console.log(err)
            }
        }        
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Ho.social</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on Ho.social.
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input 
                            placeholder="Username"
                            required
                            minLength="3"
                            className="registerInput"
                            ref={username}
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required
                            className="registerInput" 
                            ref={email}
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required
                            minLength="6"
                            className="registerInput" 
                            ref={password}
                        />
                        <input 
                            type="password" 
                            placeholder="Password Again" 
                            required
                            minLength="6"
                            className="registerInput" 
                            ref={passwordAgain}
                        />
                        <button className="registerButton" type="submit">Sign Up</button>
                        <button className="registerLoginButton">
                            <Link to="/login" className="link">
                                Log into Account
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
