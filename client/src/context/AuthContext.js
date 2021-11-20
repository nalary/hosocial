import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        "_id": "618e5de7f5567feeaa451b85",
        "username": "blue",
        "email": "blue@bkk.com",
        "profilePicture": "",
        "coverPicture": "",
        "followers": [
            "618e544a94d5c9c9cb25167a",
            "618e5df6f5567feeaa451b87"
        ],
        "followings": [
            "618e544a94d5c9c9cb25167a",
            "618e5df6f5567feeaa451b87",
            "619500b668a044efc33a7a8f"
        ],
        "isAdmin": false,
        "createdAt": "2021-11-12T12:28:23.919Z",
        "__v": 0,
        "fullName": "Blue Berry",
        "desc": "Hey, guys. I am here !!"
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
            value={{ 
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};