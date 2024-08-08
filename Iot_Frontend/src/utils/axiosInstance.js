import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://pm25project.sit.kmutt.ac.th:3000",
    timeout: 5000,
    withCredentials: true,
});

export default axiosInstance;