import axios from 'axios';

const apiHelper = axios.create({
    baseURL: 'https://farm-to-marketplace-backend.vercel.app/', // Update with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

apiHelper.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
        config.headers.authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default apiHelper;


// http://localhost:5000

