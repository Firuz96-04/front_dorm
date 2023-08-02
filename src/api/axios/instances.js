import axios from "axios";


const baseURL = 'http://127.0.0.1:8000'

const instance = axios.create({
    baseURL: baseURL,
})


export {instance}