import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (err) {
          localStorage.removeItem('user');
        }
      }
    };

    checkAuthStatus();

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/signin');
  };
  

  // Get first letter of username for avatar fallback
  const getAvatarInitial = () => {
    return user?.username?.charAt(0)?.toUpperCase() || '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top navbar-enhanced" aria-label="Main navigation">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          Rena 
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="mobileNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          {isNavCollapsed ? <FaBars /> : <FaTimes />}
        </button>

        {/* Desktop Navbar */}
        <div className={`navbar-collapse ${isNavCollapsed ? 'collapse' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">Upload Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Shop</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            
            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-dark dropdown-toggle d-flex align-items-center profile-btn"
                    onClick={handleProfileToggle}
                    aria-haspopup="true"
                    aria-expanded={isProfileOpen}
                  >
                    {user.avatar_url ? (
                      <img
                        src={`https://hope00.pythonanywhere.com${user.avatar_url}`}
                        alt={`${user.username}'s avatar`}
                        className="rounded-circle me-2 navbar-avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder me-2">
                        {getAvatarInitial()}
                      </div>
                    )}
                    <span className="username">{user.username || user.email}</span>
                  </button>

                  <div className={`dropdown-menu ${isProfileOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/orders">My Orders</Link>
                    {user.is_admin && (
                      <Link className="dropdown-item" to="/admin">Admin Dashboard</Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline-dark me-2 signin-btn">Sign In</Link>
                <Link to="/signup" className="btn btn-dark signup-btn">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Side Navbar (Offcanvas) */}
        <div className={`offcanvas offcanvas-end ${isNavCollapsed ? '' : 'show'}`} id="mobileNav" aria-labelledby="mobileNavLabel">
          <div className="offcanvas-header">
            <Link className="navbar-brand fw-bold fs-3" to="/">Rena</Link>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleNavCollapse}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {user && (
                <li className="nav-item profile-section">
                  <Link className="nav-link profile-link" to="/profile" onClick={handleNavCollapse}>
                    {user.avatar_url ? (
                      <img
                        src={`https://hope00.pythonanywhere.com${user.avatar_url}`}
                        alt={`${user.username}'s avatar`}
                        className="rounded-circle me-2 offcanvas-avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder me-2">
                        {getAvatarInitial()}
                      </div>
                    )}
                    <span className="username">{user.username || user.email}</span>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/home" onClick={handleNavCollapse}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/upload" onClick={handleNavCollapse}>Upload Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleNavCollapse}>Shop</Link>
              </li>

              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart" onClick={handleNavCollapse}>Cart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders" onClick={handleNavCollapse}>My Orders</Link>
                  </li>
                  {user.is_admin && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin" onClick={handleNavCollapse}>Admin Dashboard</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin" onClick={handleNavCollapse}>Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" onClick={handleNavCollapse}>Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;