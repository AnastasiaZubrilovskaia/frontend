import { useState } from 'react';
import flowerService from '../../api/flowers';
import { useAuth } from '../../context/AuthContext';

const FlowerForm = ({ flower: initialData, onSuccess }) => {
  const [flower, setFlower] = useState(initialData || {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  });
  const [error, setError] = useState('');
  const { user, token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlower(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await flowerService.updateFlower(initialData._id, flower, token);
      } else {
        await flowerService.createFlower(flower, token);
      }
      onSuccess();
    } catch (err) {
      setError('Failed to save flower');
      console.error(err);
    }
  };

  return (
    <div className="flower-form">
      <h2>{initialData ? 'Edit Flower' : 'Add New Flower'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={flower.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={flower.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
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
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={flower.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={flower.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FlowerForm;