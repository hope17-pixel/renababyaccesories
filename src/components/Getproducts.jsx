import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




const GetProducts = () => {

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



  return (

    <div className='container-fluid'>
     

      <h3>Available products</h3>

      <input

        type='text'

        className='form-control mb-3'

        placeholder='Search for a product...'

        value={searchTerm}

        onChange={(e) => setSearchTerm(e.target.value)}

      />
      
     
      
      <br/>
      
      <div className='row h-100'>

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product, index) => (

            <div className='col-md-4 mb-3' key={index}>

              <div className='card shadow card-margin'>

                <img src={img_url + product.product_photo} className='mt-4 product_img' alt={product.product_photo} />

                <div className='card-body'>

                  <h5 className='mt-2'>{product.product_name}</h5>

                  <p className='text-muted '>{product.product_description}</p>

                  <b className='text-warning'>{product.product_cost}</b><br />

                  <button

                    className='btn btn-success mt-2 w-100'

                    onClick={() => navigate('/makepayment', { state: { product } })}

                  >

                    Show details

                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <p className='text-center'>No products found.</p>

        )}

      </div>

    </div>

  );

};



export default GetProducts;