import apiHelper from '../utils/apiHelper';

// Example: Fetch all users (for admin dashboard)
export const getAllUsers = async () => {
    const response = await apiHelper.get('/api/users');
    return response.data; // Assuming backend returns an array of users
};

  
  // Add a new user
  export const addUserAPI = async (userData) => {
    const response = await apiHelper.post('/api/users', userData);
    return response.data;
  };
  
  // Delete a user
  export const deleteUserAPI = async (id) => {
    const response = await apiHelper.delete(`/api/users/${id}`);
    return response.data;
};

  
  