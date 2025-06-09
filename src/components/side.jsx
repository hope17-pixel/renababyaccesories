import React from 'react';
import { Link } from 'react-router-dom';
import './side.css';

const Sidebar = ({ isOpen, onClose, user }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/home">Home Page</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;