import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import trash icon

const Users = () => {
  const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    // Dynamically set the backend API URL based on the environment
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';  // Default to localhost for development

    try {
      const response = await axios.get(`${apiUrl}/api/users`);  // Make request to the dynamic URL
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data?.message || error.message);
    }
  };

  fetchUsers();
}, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`); // Backend delete route
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id)); // Remove user from state
      console.log(`User with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error.response?.data?.message || 'Error deleting user');
      alert('Error deleting user: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Registered Users
      </h1>

      {/* Container for horizontal scrolling on smaller screens */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full text-xs sm:text-sm text-left text-gray-800">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-2 py-1 border border-gray-300">Name</th>
                <th className="px-2 py-1 border border-gray-300">Age</th>
                <th className="px-2 py-1 border border-gray-300">Email</th>
                <th className="px-2 py-1 border border-gray-300">Contact</th>
                <th className="px-2 py-1 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-2 py-1 border border-gray-300">{user.name}</td>
                  <td className="px-2 py-1 border border-gray-300">{user.age}</td>
                  <td className="px-2 py-1 border border-gray-300">{user.email}</td>
                  <td className="px-2 py-1 border border-gray-300">{user.contact}</td>
                  <td className="px-2 py-1 border border-gray-300">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-black-600 hover:text-red-500 transition"
                      title="Delete User"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
