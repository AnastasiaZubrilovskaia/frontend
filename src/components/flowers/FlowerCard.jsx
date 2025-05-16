import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import flowerService from '../../api/flowers';

const FlowerCard = ({ flower, onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await flowerService.deleteFlower(flower._id, user.token);
      onDelete(flower._id);
    } catch (err) {
      console.error('Failed to delete flower:', err);
    }
  };

  return (
    <div className="flower-card">
      <h3>{flower.name}</h3>
      <p>{flower.description}</p>
      <p>Price: {flower.price}</p>
      <p>Stock: {flower.stock}</p>
      <p>Category: {flower.category}</p>
      
      {user?.role === 'customer' && flower.stock > 0 && (
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      )}
      
      {['manager', 'admin'].includes(user?.role) && (
        <div className="flower-actions">
          <button onClick={() => onUpdate(flower)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default FlowerCard;