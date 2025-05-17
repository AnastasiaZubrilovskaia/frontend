import { useState, useEffect } from 'react';
import FlowerCard from './FlowerCard';
import FlowerForm from './FlowerForm';
import { useAuth } from '../../context/AuthContext';
import flowerService from '../../api/flowers';

const FlowerList = ({ onAddToCart, token, user }) => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFlower, setEditingFlower] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      console.log('Fetched flowers:', data);
      setFlowers(data);
    } catch (err) {
      console.error('Error fetching flowers:', err);
      setError('Ошибка при загрузке цветов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFlowers();
    }
  }, [token]);

  const handleUpdate = (flower) => {
    if (['manager', 'admin'].includes(user?.role)) {
      setEditingFlower(flower);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (user?.role !== 'admin') {
      return;
    }

    if (window.confirm('Вы уверены, что хотите удалить этот цветок?')) {
      try {
        await flowerService.deleteFlower(id, token);
        fetchFlowers();
      } catch (error) {
        console.error('Ошибка при удалении цветка:', error);
        setError('Ошибка при удалении цветка');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingFlower(null);
    fetchFlowers();
  };

  const handleAddNew = () => {
    setEditingFlower(null);
    setShowForm(true);
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flower-list">
      {showForm ? (
        <FlowerForm 
          flower={editingFlower} 
          onSuccess={handleFormSuccess} 
        />
      ) : (
        <>
          <div className="flowers-header">
            <h1>Наши цветы</h1>
            {['manager', 'admin'].includes(user?.role) && (
              <button 
                className="add-flower-btn small" 
                onClick={handleAddNew}
              >
                Добавить новый цветок
              </button>
            )}
          </div>
          {flowers.length === 0 ? (
            <div className="no-flowers">Цветы не найдены</div>
          ) : (
            <div className="flower-grid">
              {flowers.map(flower => (
                <FlowerCard
                  key={flower._id}
                  flower={flower}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlowerList;