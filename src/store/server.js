import axios from "axios";
export const BASE_URL = process.env.VUE_APP_JSONPLACEHOLDER_URL;
export const SERVER = axios.create({
    baseURL: BASE_URL,
});

export default SERVER;