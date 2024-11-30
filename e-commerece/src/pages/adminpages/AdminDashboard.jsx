import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaBox, FaSignOutAlt } from 'react-icons/fa';
import './admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 admin-sidebar">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white h-100">
            <div className="admin-profile">
              <img 
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                alt="Admin Profile" 
                className="admin-profile-img"
              />
            </div>
            <span className="fs-4 d-none d-sm-inline mb-4">Admin Panel</span>
            <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100">
              <li className="w-100">
                <div className="admin-nav-item" onClick={() => navigate('/manage-users')}>
                  <FaUserAlt />
                  <span className="ms-2">Manage Users</span>
                </div>
              </li>
              <li className="w-100">
                <div className="admin-nav-item" onClick={() => navigate('/manage-products')}>
                  <FaBox />
                  <span className="ms-2">Manage Products</span>
                </div>
              </li>
            </ul>
            <div className="dropdown pb-4 mt-auto w-100">
              <div className="admin-nav-item">
                <FaSignOutAlt />
                <span className="ms-2">Logout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col admin-content">
          <div className="container">
            <div className="row g-4">
              {/* Manage Users Card */}
              <div className="col-12 col-md-6">
                <div className="card admin-card h-100" onClick={() => navigate('/manage-users')}>
                  <div className="card-body text-white d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="admin-card-icon">
                      <FaUserAlt />
                    </div>
                    <div className="admin-card-content text-center">
                      <h5 className="card-title my-2 text-dark">Manage Users</h5>
                      <p className="card-text text-dark">View and manage user accounts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Products Card */}
              <div className="col-12 col-md-6">
                <div className="card admin-card secondary h-100" onClick={() => navigate('/manage-products')}>
                  <div className="card-body text-white d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="admin-card-icon">
                      <FaBox />
                    </div>
                    <div className="admin-card-content text-center">
                      <h5 className="card-title  my-3 text-dark">Manage Products</h5>
                      <p className="card-text text-dark">View and manage products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
