import axios from 'axios'
import join from 'url-join'

axios.interceptors.request.use(async (config) => {
    const jwtToken = await localStorage.getItem("token")
    if (jwtToken != null){
        config.headers = {'Authorization': `Bearer ${jwtToken}`}
    }
    config.url = join('https://guarded-falls-57008.herokuapp.com/', config.url);
    return config;
});

export const Axios = axios