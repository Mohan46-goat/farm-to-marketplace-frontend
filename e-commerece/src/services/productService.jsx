import apiHelper from '../utils/apiHelper';

export const getAllProducts = async () => {
    const response = await apiHelper.get('/api/products');
    return response.data; // Assuming backend returns an array of products
};

// export const getProductById = async (id) => {
//     const response = await apiHelper.get(`/api/products/${id}`);
//     return response.data; // Assuming backend returns a single product object
// };


// Fetch a product by ID (Public route)
export const fetchProductByIdAPI = async (id) => {
    try {
        const response = await apiHelper.get(`/api/products/${id}`); // Backend route with product ID
        return response.data; // Assuming the backend returns the product details
    } catch (error) {
        throw new Error(error.response?.data?.message || `Error fetching product with ID: ${id}`);
    }
};

// Create a new product (Admin route)
export const createProductAPI = async (productData) => {
    try {
        const response = await apiHelper.post('/api/products', productData); // Backend route
        return response.data; // Assuming the backend returns the created product
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating product');
    }
};

// Update a product by ID (Admin route)
export const updateProductAPI = async (id, updatedData) => {
    try {
        const response = await apiHelper.put(`/api/products/${id}`, updatedData); // Backend route with product ID
        return response.data; // Assuming the backend returns the updated product
    } catch (error) {
        throw new Error(error.response?.data?.message || `Error updating product with ID: ${id}`);
    }
};

// Delete a product by ID (Admin route)
export const deleteProductAPI = async (id) => {
    try {
        const response = await apiHelper.delete(`/api/products/${id}`); // Backend route with product ID
        return response.data; // Assuming the backend returns a success message or deleted product
    } catch (error) {
        throw new Error(error.response?.data?.message || `Error deleting product with ID: ${id}`);
    }
};