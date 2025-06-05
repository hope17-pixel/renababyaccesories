import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './account';

const Navbar = ({ user, setUser }) => {
  // Get the first character of username or default to 'U' if no user
  const userInitial = user?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <div>
      <section className="row container-fluid">
        <div className="col-md-12">
          <div className="navbar navbar-expand-md bg-light navbar-light">
            <Link to="/" className="navbar-brand text-dark">
              <b>Rena Baby Accessories</b>
            </Link>
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarcontents"
              aria-controls="navbarcontents"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-nav ms-auto navbar-collapse collapse" id="navbarcontents">
              <Link to="/home" className="btn btn-outline-dark mx-2 bg-warning navbar-item">
                Home
              </Link>
              <Link to="/upload" className="btn btn-outline-dark mx-2 bg-warning navbar-item">
                Upload Product
              </Link>
              <Link to="/" className="btn btn-outline-dark mx-2 bg-warning navbar-item">
                Get Products
              </Link>
              {user ? (
                <Link to="/profile" className="btn btn-outline-dark mx-2 bg-warning navbar-item">
                  <span className="rounded-circle bg-dark text-white d-inline-block text-center" style={{width: '30px', height: '30px', lineHeight: '30px'}}>
                    {userInitial}
                  </span>
                  {' Profile'}
                </Link>
              ) : (
                <AccountDropdown user={user} setUser={setUser} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;