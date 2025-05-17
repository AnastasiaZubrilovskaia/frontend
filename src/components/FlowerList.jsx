import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flowerService from '../api/flowers';
import FlowerCard from './FlowerCard';
import FlowerForm from './FlowerForm';
import '../styles/FlowerList.css';

const FlowerList = ({ flowers: initialFlowers, onAddToCart, onUpdateList, isCustomer, token, user }) => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFlower, setEditingFlower] = useState(null);
  const navigate = useNavigate();

  const fetchFlowers = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) {
        console.error('Token is missing in fetchFlowers');
        return;
      }
      console.log('Fetching flowers with token:', token);
      const data = await flowerService.getFlowers(token);
      setFlowers(data);
    } catch (err) {
      console.error('Error fetching flowers:', err);
      setError('Ошибка при загрузке цветов');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFlowers) {
      setFlowers(initialFlowers);
      setLoading(false);
    } else if (token) {
      fetchFlowers();
    }
  }, [initialFlowers, token]);

  const handleAdd = () => {
    if (!token) {
      setError('Требуется авторизация');
      navigate('/login');
      return;
    }
    setEditingFlower(null);
    setShowForm(true);
  };

  const handleEdit = (flower) => {
    try {
      console.log('FlowerList - handleEdit - Starting edit for flower:', flower);
      console.log('FlowerList - handleEdit - Current token:', token);
      
      if (!token) {
        console.error('FlowerList - handleEdit - No token available');
        setError('Требуется авторизация');
        navigate('/login');
        return;
      }
      
      setEditingFlower(flower);
      setShowForm(true);
    } catch (error) {
      console.error('FlowerList - handleEdit - Error:', error);
      setError(error.message || 'Ошибка при редактировании цветка');
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('FlowerList - handleDelete - Starting deletion for flower ID:', id);
      console.log('FlowerList - handleDelete - Current token:', token);
      console.log('FlowerList - handleDelete - Current flowers:', flowers);
      
      if (!token) {
        console.error('FlowerList - handleDelete - No token available');
        throw new Error('Требуется авторизация');
      }
      
      await flowerService.deleteFlower(id, token);
      console.log('FlowerList - handleDelete - Flower deleted successfully');
      
      // Обновляем список цветов после удаления
      const updatedFlowers = flowers.filter(flower => flower._id !== id);
      console.log('FlowerList - handleDelete - Updated flowers list:', updatedFlowers);
      setFlowers(updatedFlowers);
      if (typeof onUpdateList === 'function') {
        onUpdateList();
      }
      setError(null);
    } catch (error) {
      console.error('FlowerList - handleDelete - Error:', error);
      setError(error.message || 'Ошибка при удалении цветка');
    }
  };

  const handleSave = async (flowerData) => {
    try {
      if (!token) {
        setError('Требуется авторизация');
        navigate('/login');
        return;
      }

      if (editingFlower) {
        await flowerService.updateFlower(editingFlower._id, flowerData, token);
      } else {
        await flowerService.createFlower(flowerData, token);
      }
      setShowForm(false);
      fetchFlowers();
    } catch (err) {
      console.error('Error saving flower:', err);
      if (err.response?.status === 403) {
        setError('У вас нет прав для редактирования цветов');
      } else {
        setError('Ошибка при сохранении цветка');
      }
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="flower-list-container">
      <div className="flower-list-header">
        <h2>Цветы</h2>
        {user && (user.role === 'admin' || user.role === 'manager') && (
          <button className="add-flower-button" onClick={handleAdd}>
            Добавить новый цветок
          </button>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="flower-list">
        {flowers.map(flower => (
          <FlowerCard
            key={flower._id}
            flower={flower}
            onEdit={() => handleEdit(flower)}
            onDelete={() => handleDelete(flower._id)}
            canEdit={user?.role === 'admin' || user?.role === 'manager'}
            canDelete={user?.role === 'admin'}
            token={token}
          />
        ))}
      </div>
      {showForm && (
        <FlowerForm
          flower={editingFlower}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default FlowerList; 