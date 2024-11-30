import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUserAPI } from '../../services/userService';
import './manageuser.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = (e, userId) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUserAPI(userId);
      // Refresh the users list after successful deletion
      fetchUsers();
      // Close the dropdown menu
      setActiveMenu(null);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Management</h2>

      <div className="d-flex justify-content-end mb-4">
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/users/add')}
        >
          Add User
        </button>
      </div>
      
      {/* User Cards */}
      <div className="row gy-4 mb-4">
        {users.map((user) => (
          <div key={user._id} className="col-md-4">
            <div className="card user-card position-relative">
              {/* Three-dot menu */}
              <div className="dropdown position-absolute end-0 top-0 m-2" style={{ zIndex: 1 }}>
                <button 
                  className="btn btn-link text-dark p-0" 
                  onClick={(e) => toggleMenu(e, user._id)}
                  style={{ fontSize: '20px' }}
                >
                  ⋮
                </button>
                {activeMenu === user._id && (
                  <div className="dropdown-menu show position-absolute end-0" 
                       style={{ 
                         minWidth: '120px',
                         boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                         backgroundColor: '#fff',
                         borderRadius: '4px',
                         padding: '0.5rem 0'
                       }}>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="card-body">
                <div className='d-flex justify-content-center align-items-center'>
                  <img 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="User"
                    className="rounded-circle user-avatar"
                  />
                </div>
                <div className="text-center mb-3 user-card-content">
                  <h5 className="card-title text-center user-card-description">{user.email}</h5>
                  <p className="card-description text-center user-card-title">Role: {user.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
