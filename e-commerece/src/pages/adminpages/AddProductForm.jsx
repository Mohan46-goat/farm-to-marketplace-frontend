import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProductAPI } from "../../services/productService";

const AddProductForm = () => {
const [product, setProduct] = useState({
        name: '',
        subname: '',
        description: '',
        price: '',
        pricecaption: '',
        quantity: '',
        image: '',
        category: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProductAPI(product);
            alert("Product added successfully");
            navigate('/manage-products');
        } catch (error) {
            console.error("Error adding product:", error.message);
            alert("Failed to add product");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add New Product</h2>
<Form onSubmit={handleSubmit} className="max-w-500 mx-auto">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="subname">
                    <Form.Label>Product Subname</Form.Label>
                    <Form.Control
                        type="text"
                        name="subname"
                        value={product.subname}
                        onChange={handleChange}
                        placeholder="Enter product subname"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pricecaption">
                    <Form.Label>Price Caption</Form.Label>
                    <Form.Control
                        type="text"
                        name="pricecaption"
                        value={product.pricecaption}
                        onChange={handleChange}
                        placeholder="Enter price caption"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Enter product category"
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate('/manage-products')}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddProductForm;
