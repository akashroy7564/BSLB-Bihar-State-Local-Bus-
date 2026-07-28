import axios, { Axios } from "axios";

const api= axios.create({
    baseURL:"https://bslb-bihar-state-local-bus.onrender.com/api"
})

export default api;