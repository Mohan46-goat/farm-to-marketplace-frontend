import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProductAPI, fetchProductByIdAPI } from "../../services/productService";

const UpdateProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
const [productData, setProductData] = useState({
        name: '',
        subname: '',
        description: '',
        price: '',
        pricecaption: '',
        quantity: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await fetchProductByIdAPI(id);
setProductData({
                    name: product.name,
                    subname: product.subname,
                    description: product.description,
                    price: product.price,
                    pricecaption: product.pricecaption,
                    quantity: product.quantity,
                    image: product.image,
                    category: product.category
                });
            } catch (error) {
                console.error("Error fetching product:", error.message);
                alert("Failed to fetch product details");
                navigate('/manage-products');
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProductAPI(id, productData);
            alert("Product updated successfully");
            navigate('/manage-products');
        } catch (error) {
            console.error("Error updating product:", error.message);
            alert("Failed to update product");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Update Product</h2>
<Form onSubmit={handleSubmit} className="max-w-500 mx-auto">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="subname">
                    <Form.Label>Product Subname</Form.Label>
                    <Form.Control
                        type="text"
                        name="subname"
                        value={productData.subname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pricecaption">
                    <Form.Label>Price Caption</Form.Label>
                    <Form.Control
                        type="text"
                        name="pricecaption"
                        value={productData.pricecaption}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={productData.image}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate('/manage-products')}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Update Product
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default UpdateProductForm;
