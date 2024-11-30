import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { getAllUsers, addUserAPI, deleteUserAPI } from '../../services/userService';

const UserAddAndDeleteForm = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'customer' });

  // Fetch all users on component load
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

  // Handle form submission to add a user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const addedUser = await addUserAPI(newUser);
      setUsers([...users, addedUser]); // Update state with the new user
      setNewUser({ name: '', email: '', role: 'customer' }); // Reset the form
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      await deleteUserAPI(id);
      setUsers(users.filter((user) => user._id !== id)); // Update state by removing the deleted user
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    
    <div className="user-management p-4">
      <h2 className="text-center">User Management</h2>

      {/* Add User Form */}
      <Form className="my-4" onSubmit={handleAddUser}>
        <Form.Group controlId="userName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="userEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter user email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="userRole" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>

      {/* Users Table */}
      <table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAddAndDeleteForm;
