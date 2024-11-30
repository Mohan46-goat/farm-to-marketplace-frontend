import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUserAPI } from '../../services/userService';

const DeleteUserForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert('Please select a user to delete');
      return;
    }

    try {
      await deleteUserAPI(selectedUser);
      alert('User deleted successfully');
      navigate('/manage-users');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Delete User</h2>
      <Form onSubmit={handleSubmit} className="max-w-500 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Select User to Delete</Form.Label>
          <Form.Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email} - {user.role}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/manage-users')}>
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Delete User
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteUserForm;
