import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://hosocial-api.vercel.app/api"
});