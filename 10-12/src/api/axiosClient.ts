import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

axiosClient.interceptors.request.use(
  (config) => {
    config.baseURL = 'https://jsonplaceholder.typicode.com';
    
    config.headers.Authorization = 'Bearer demo-token';
    
    console.log('Axios Interceptor: Request sent', config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;