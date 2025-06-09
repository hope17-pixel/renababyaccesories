import { useState } from 'react';
import {useLocation} from 'react-router-dom'
import '../App.css'
import  axios  from 'axios';

const Makepayment = ()=> {
    // Extract the received product using useLocation()
    const { product } = useLocation().state || {}; 
    //Hook to Hold Phone Number
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    const img_url = "https://hope00.pythonanywhere.com/static/images/"

    
    //Create a submit Function
    const submit = async(e) =>{
        e.preventDefault(); // prebent default JS actions
     //Update loading Hook with a message
     setMessage("Please wait as we Processs!");

      // Put updated hooks in data variable
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);

      //post your data to your Backend API
      const response = await axios.post(
        "https://hope00.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setMessage("Please Complete Payment on Your Phone")
    }

    return(
    <div className="container py-5">
        <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-success text-white">
                <h2 className="text-center mb-0">LIPA NA MPESA</h2>
            </div>
            <div className="card-body p-4">
                <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <div className="text-center mb-3">
                            <img 
                                src={img_url + product.product_photo} 
                                alt={product.product_name} 
                                className="product_img w-100 h-100 object-fit-cover rounded shadow-md"
                            />
                        </div>
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Property Details</h5>
                                <p className="card-text mb-1"><span className="fw-bold">{product.product_name}</span></p>
                                <p className="card-text"><span className="text-muted">Cost:</span> <span className="fw-bold text-success fs-5">KSh {product.product_cost}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="alert alert-info mb-3" role="alert">
                            <i className="bi bi-info-circle-fill me-2"></i>
                            Enter your M-PESA registered phone number to complete this transaction
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-3">
                           
                        </div>
                        <div className="card shadow rounded p-2">
                        <h4 className="text-xl font-semibold mb-2 text-gray-800 text-bold">More Details</h4> 
                            <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-200">
                                <div className="max-h-48 overflow-y-auto text-gray-600 leading-relaxed pr-2 rounded">
                                    {product.product_description}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
                <form onSubmit={submit}>
                    {message && <div className="alert alert-warning mb-3">{message}</div>}
                    
                    <div className="form-floating mb-4">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                        <label htmlFor="phoneNumber">Enter Phone Number</label>
                    </div>
                    
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg">
                            <i className="bi bi-cash me-2"></i>Buy Now 💸
                        </button>
                    </div>
                </form>
            </div>
            <div className="card-footer text-center text-success py-3">
                <small>Secure payments powered by M-PESA</small>
            </div>
        </div>
    </div>
    )
}

export default Makepayment;