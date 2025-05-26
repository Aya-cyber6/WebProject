import React from 'react';


const UserDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome to your Dashboard</h2>
      <p>You have successfully logged in.</p>
      {/* Add more content below as needed */}
      <div className="card mt-4 p-3">
        <h5>Your Info</h5>
        <p>Username: (display from state or context)</p>
        <p>Email: (if available)</p>
      </div>

    </div>
  );
};

export default UserDashboard;
