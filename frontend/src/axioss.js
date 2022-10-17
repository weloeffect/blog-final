import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/"
    // baseURL: "https://blog-final101.herokuapp.com/"
})