import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const FlowerCard = ({ flower, onUpdate, onDelete, onAddToCart }) => {
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(flower._id);
    }
  };

  const handleAddToCart = () => {
    if (flower.stock > 0) {
      addToCart(flower);
    }
  };

  return (
    <div className="flower-card">
      <div className="flower-info">
        <h3>{flower.name}</h3>
        <p className="description">{flower.description}</p>
        <p className="price">{flower.price} ₽</p>
        <p className="stock">В наличии: {flower.stock} шт.</p>
        <p className="category">Категория: {flower.category}</p>
      </div>
      <div className="flower-actions">
        {user?.role === 'customer' && flower.stock > 0 && (
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Добавить в корзину
          </button>
        )}
        
        {['manager', 'admin'].includes(user?.role) && (
          <button 
            onClick={() => onUpdate(flower)}
            className="edit-btn"
          >
            Редактировать
          </button>
        )}
        
        {user?.role === 'admin' && (
          <button 
            onClick={handleDelete}
            className="delete-btn"
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export default FlowerCard;