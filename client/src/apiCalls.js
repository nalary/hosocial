import { axiosInstance } from "./config";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axiosInstance.post("auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};

export const shareCall = async (newPost) => {
    try {
        await axiosInstance.post("/posts", newPost);
        window.location.reload();
    } catch (err) {
        console.log(err)
    }
};

export const updateCall = async (updatedUser, userId, dispatch) => {
    dispatch({ type: "UPDATE_START" });
    try {
        const res = await axiosInstance.put(`/users/${userId}`, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};