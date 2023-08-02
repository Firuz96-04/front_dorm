import axios from "axios";
// import { instance } from "./instances";



function getLocalAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken; 
}

function getLocalRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
}


function refreshToken() {
    return instance.post("/api/token/refresh/", {
      refreshToken: getLocalRefreshToken(),
    });
  }


const baseURL = 'http://127.0.0.1:8000'

const instance = axios.create({
    baseURL: baseURL,
})

instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        console.log('request is sent');
    return config
},
    (error) => {
        return Promise.reject(error)
    }
)


instance.interceptors.response.use(
    (response) => {
        console.log('mess');
        console.log(response);
        return response
},
   async (error) => {
       const originalConfig = error.config
       if (error.response) {
        console.log('erros response');
            if (error.response.status === 401 && !originalConfig._retry) {
                console.log('401');
                originalConfig._retry = true
                try {
                    const rs = await refreshToken()
                    const {access} = rs.data
                    console.log(access, 'access');
                    localStorage.setItem('accessToken2', 'mesagess')
                    localStorage.setItem('accessToken', access)
                    instance.defaults.headers.common['Authorization'] = access

                    return instance(originalConfig)
                }
                catch(_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data)
                    }
                    return Promise.reject(_error)
                }
            }
            if (error.response.status === 403 && error.response.data ) {
                return Promise.reject(error.response.data)
           } 
        }

      
        return Promise.reject(error)
    }
)

  export {instance as http}