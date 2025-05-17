import { useState, useEffect } from 'react';
import flowerService from '../../api/flowers';
import { useAuth } from '../../context/AuthContext';

const FlowerForm = ({ flower: initialData, onSuccess }) => {
  const [flower, setFlower] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  });
  const [error, setError] = useState('');
  const { user, token } = useAuth();

  useEffect(() => {
    if (initialData) {
      setFlower(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlower(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!token) {
      setError('Необходима авторизация');
      return;
    }

    try {
      if (initialData) {
        await flowerService.updateFlower(initialData._id, flower, token);
      } else {
        await flowerService.createFlower(flower, token);
      }
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      console.error('Ошибка при сохранении цветка:', err);
      setError(err.response?.data?.message || 'Ошибка при сохранении цветка');
    }
  };

  return (
    <div className="flower-form">
      <h2>{initialData ? 'Редактировать цветок' : 'Добавить новый цветок'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            name="name"
            value={flower.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea
            name="description"
            value={flower.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Цена</label>
          <input
            type="number"
            name="price"
            value={flower.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Категория</label>
          <input
            type="text"
            name="category"
            value={flower.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Количество</label>
          <input
            type="number"
            name="stock"
            value={flower.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default FlowerForm;