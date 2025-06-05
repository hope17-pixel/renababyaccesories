import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Please wait...');
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const response = await axios.post('https://hope00.pythonanywhere.com/api/signin', data);
      setLoading('');

      setSuccess(response.data.Success || 'Login successful');
      localStorage.setItem('user', JSON.stringify(response.data.user));

      if (response.data.user) {
        navigate('/');
      } else {
        setError('Login Failed!!');
      }
    } catch (error) {
      setLoading('');
      setSuccess('');
      setError(error.response?.data?.Error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 card">
        <form onSubmit={submit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-center">
              {error}
            </div>
          )}
          {loading && (
            <div className="bg-blue-100 text-blue-700 p-3 rounded-md text-center">
              {loading}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;