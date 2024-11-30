import apiHelper from '../utils/apiHelper';

export const loginUserAPI = async (email, password) => {
    const response = await apiHelper.post('/api/auth/login', { email, password });
    return response.data; // Assuming the backend returns user data
};

export const fetchUsersAPI = async () => {
    const response = await apiHelper.get('/api/users'); // Assuming this is your endpoint
    return response.data;
};

// Fetch Products API
export const fetchProductsAPI = async () => {
    const response = await apiHelper.get('/api/products'); // Assuming this is your endpoint
    return response.data;
};