import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Uploadproduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCost, setProductCost] = useState('');
  const [productPhoto, setProductPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please sign in to upload a product.');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_description', productDescription);
    formData.append('product_cost', productCost);
    formData.append('product_photo', productPhoto);

    try {
      const response = await axios.post('https://hope00.pythonanywhere.com/api/add_product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess(response.data.success);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="productCost" className="form-label">Cost</label>
          <input
            type="number"
            className="form-control"
            id="productCost"
            value={productCost}
            onChange={(e) => setProductCost(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPhoto" className="form-label">Product Photo</label>
          <input
            type="file"
            className="form-control"
            id="productPhoto"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default Uploadproduct;