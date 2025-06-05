import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Signin from './components/Signin';
import Signup from './components/Signup';
import Uploadproduct from './components/Uploadproduct';
import Navbar from './components/Navbar';
import Makepayment from './components/Makepayment';
import GetProducts from './components/Getproducts';
import Details from './components/details';
import Home from './components/home';
import Chatbot from './components/help';
import Sidebar from './components/side';
import ProfilePage from './components/profile';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user profile on mount if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://hope00.pythonanywhere.com/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          localStorage.removeItem('token'); // Clear invalid token
        }
      }
    };
    fetchProfile();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} user={user} />
        <main className="main-content">
          <header className="App-header bg-warning text-center py-3">
            <h1>RENA BABY ACCESSORIES</h1>
            <Details />
          </header>
          <button
            className="menu-btn btn btn-outline-dark m-2"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            ☰ Menu
          </button>
          <Navbar user={user} setUser={setUser} />
          <div className="content-area container">
            <Routes>
              <Route path="/signup" element={<Signup setUser={setUser} />} />
              <Route path="/signin" element={<Signin setUser={setUser} />} />
              <Route path="/makepayment" element={<Makepayment />} />
              <Route path="/upload" element={<Uploadproduct />} />
              <Route path="/" element={<GetProducts />} />
              <Route path="/home" element={<Home />} />
              <Route path="/help" element={<Chatbot />} />
              <Route path="/profile" element={<ProfilePage user={user} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;