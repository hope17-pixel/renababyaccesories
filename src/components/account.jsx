import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AccountDropdown = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsOpen(false);
  };

  const userInitial = user?.username?.charAt(0).toUpperCase() || '👤';

  return (
    <div className="account-dropdown bg-warning" ref={dropdownRef}>
      <button
        className="account-btn btn btn-outline-dark bg-warning"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="user-icon">{userInitial}</span>
        <span className="account-text">Account</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {user ? (
            <>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <button onClick={handleLogout} className="dropdown-item">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="dropdown-item signin-btn">
                Sign In
              </Link>
              <Link to="/signup" className="dropdown-item signup-btn">
                Create Account
              </Link>
            </>
          )}
          <div className="dropdown-divider"></div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;