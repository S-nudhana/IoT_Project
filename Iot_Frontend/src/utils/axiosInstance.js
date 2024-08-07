import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://pm25project-in.sit.kmutt.ac.th:3000",
    timeout: 5000,
    withCredentials: true,
});

export default axiosInstance;
