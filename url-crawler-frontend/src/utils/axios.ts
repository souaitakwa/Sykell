import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: "Bearer mySuperSecretToken",
    },
});

export default api;
