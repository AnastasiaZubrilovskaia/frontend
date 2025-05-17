import { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h1>Управление пользователями</h1>
      {error && <div className="error-message">{error}</div>}
      
      <div className="users-list">
        {users.map((user, index) => (
          <div key={user._id} className="user-item">
            <h3>{index + 1}. {user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Роль: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;