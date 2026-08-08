import axios, { Axios } from "axios";

const api= axios.create({
    baseURL:"https://bslb-bihar-state-local-bus.onrender.com/api"
})

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
// });

export default api;