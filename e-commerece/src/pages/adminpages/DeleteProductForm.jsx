import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProductAPI } from '../../services/productService';

const DeleteProductForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert('Please select a product to delete');
      return;
    }

    try {
      await deleteProductAPI(selectedProduct);
      alert('Product deleted successfully');
      navigate('/manage-products');
    } catch (error) {
      console.error('Error deleting product:', error.message);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Delete Product</h2>
      <Form onSubmit={handleSubmit} className="max-w-500 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Select Product to Delete</Form.Label>
          <Form.Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - ${product.price} (Stock: {product.stock})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/manage-products')}>
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Delete Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteProductForm;
