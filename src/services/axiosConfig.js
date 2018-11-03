import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;
window.axios = axios;

let instance = null;

class AxiosConfigurator {
    constructor(store) {
        if (!instance) {
            instance = this;
        }
        this.store = store;
        this.configureAxios();
        return instance;
    }

    configureAxios = () => {
        axios.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(response => {
            return response;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

export default AxiosConfigurator;
