import React from 'react';

const ProfilePage = ({ user }) => {
  if (!user) {
    return <div className="container mt-4">Please sign in to view your profile.</div>;
  }

  const userInitial = user.username?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="profile container mt-4">
      <h2>Profile</h2>
      <p><strong>Initial:</strong> {userInitial}</p>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
};

export default ProfilePage;