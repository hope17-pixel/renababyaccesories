import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const GetProducts = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const img_url = 'https://hope00.pythonanywhere.com/static/images/';
  const navigate = useNavigate();

  // Function to get products
  const getProducts = async () => {
    try {
      const response = await axios.get('https://hope00.pythonanywhere.com/api/get_products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Function to handle search
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click on "Show details" button
  const handleShowDetails = (product) => {
      navigate('/makepayment', { state: { product } });
  };

  return (
    <div className="container-fluid">
      <h3 className="my-4 text-center text-2xl font-bold text-gray-800">Available Products</h3>
      <input
        type="text"
        className="form-control mb-4 w-full max-w-md mx-auto border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row h-100">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={img_url + product.product_photo}
                  className="mt-4 product_img w-full h-48 object-cover"
                  alt={product.product_name}
                />
                <div className="card-body p-4">
                  <h5 className="mt-2 text-lg font-semibold text-gray-900">{product.product_name}</h5>
                  <p className="text-muted text-sm mb-2">{product.product_description}</p>
                  <p className="text-warning font-bold text-lg">KSh {product.product_cost}</p>
                  <button
                    className="btn btn-success mt-3 w-full rounded-lg py-2 text-white bg-green-600 hover:bg-green-700 transition-colors"
                    onClick={() => handleShowDetails(product)}
                  >
                    Show Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default GetProducts;