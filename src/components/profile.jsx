import { useState, useEffect } from 'react';
import { FaEdit, FaCamera, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setFormData({
            username: parsedUser.username || '',
            email: parsedUser.email || '',
            phone: parsedUser.phone || ''
          });
          if (parsedUser.avatar_url) {
            setAvatarPreview(`https://hope00.pythonanywhere.com${parsedUser.avatar_url}`);
          }
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const userData = localStorage.getItem('user');
      if (!userData) throw new Error('User not authenticated');
      
      const parsedUser = JSON.parse(userData);
      const token = localStorage.getItem('token');
      
      if (editMode) {
        const response = await axios.put(
          `https://hope00.pythonanywhere.com/api/users/${parsedUser.id}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        const updatedUser = { ...parsedUser, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccess('Profile updated successfully!');
      }
      
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        
        const avatarResponse = await axios.post(
          'https://hope00.pythonanywhere.com/api/users/me/avatar',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        const updatedUser = { 
          ...parsedUser, 
          avatar_url: avatarResponse.data.avatar_url 
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setAvatarPreview(`https://hope00.pythonanywhere.com${avatarResponse.data.avatar_url}`);
        setSuccess(prev => prev ? `${prev} Avatar updated!` : 'Avatar updated!');
      }
      
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const getInitials = () => {
    if (!user) return '';
    return user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <FaSpinner className="fa-spin fa-2x mb-2 text-warning" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="card shadow-sm border-warning mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center bg-light">
            <h2 className="card-title mb-3 text-warning">Profile</h2>
            <p className="card-text">Please sign in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-warning mx-auto" style={{ maxWidth: '600px', backgroundColor: '#fff8e1' }}>
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h3 className="mb-0">My Profile</h3>
          {!editMode && (
            <button 
              className="btn btn-dark btn-sm"
              onClick={() => setEditMode(true)}
            >
              <FaEdit className="me-1" /> Edit
            </button>
          )}
        </div>

        <div className="w-100">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="w-100">
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Profile" 
                    className="rounded-circle border border-warning"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                ) : (
                  <div 
                    className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center border border-dark"
                    style={{ width: '120px', height: '120px', fontSize: '48px' }}
                  >
                    {getInitials()}
                  </div>
                )}
                {editMode && (
                  <label 
                    htmlFor="avatar-upload" 
                    className="position-absolute bottom-0 end-0 bg-dark text-warning rounded-circle p-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaCamera />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="d-none"
                    />
                  </label>
                )}
              </div>
              {avatarFile && editMode && (
                <p className="text-muted mt-2">{avatarFile.name}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Username</label>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="form-control border-warning"
                />
              ) : (
                <p className="form-control-plaintext">{user.username || 'Not set'}</p>
              )}
            </div>

            <div className="mb-3 ">
              <label className="form-label text-dark fw-bold">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control border-warning"
                  disabled
                />
              ) : (
                <p className="form-control-plaintext">{user.email || 'Not set'}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Phone</label>
              {editMode ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control border-warning"
                />
              ) : (
                <p className="form-control-plaintext">{user.phone || 'Not set'}</p>
              )}
            </div>

            {editMode && (
              <div className="d-flex gap-2 mt-4">
                <button 
                  type="button" 
                  className="btn btn-outline-dark flex-grow-1"
                  onClick={() => {
                    setEditMode(false);
                    setError('');
                    setSuccess('');
                    setFormData({
                      username: user.username || '',
                      email: user.email || '',
                      phone: user.phone || ''
                    });
                    setAvatarPreview(user.avatar_url ? 
                      `https://hope00.pythonanywhere.com${user.avatar_url}` : '');
                    setAvatarFile(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-warning text-dark flex-grow-1">
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {user.is_admin && (
            <div className="mt-4">
              <h5 className="text-dark fw-bold">Admin Actions</h5>
              <Link to="/admin" className="btn btn-outline-warning text-dark w-100">
                Go to Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;