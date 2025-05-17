import React from 'react';
import '../styles/FlowerCard.css';

const FlowerCard = ({ flower, onEdit, onDelete, canEdit, canDelete, token }) => {
  const handleDelete = async () => {
    try {
      console.log('FlowerCard - handleDelete - Starting deletion for flower:', {
        id: flower._id,
        name: flower.name
      });
      
      if (window.confirm('Вы уверены, что хотите удалить этот цветок?')) {
        await onDelete(flower._id);
        console.log('FlowerCard - handleDelete - Deletion confirmed and completed');
      } else {
        console.log('FlowerCard - handleDelete - Deletion cancelled by user');
      }
    } catch (error) {
      console.error('FlowerCard - handleDelete - Error:', error);
      // Ошибка уже обрабатывается в родительском компоненте
    }
  };

  return (
    <div className="flower-card">
      <img src={flower.image} alt={flower.name} className="flower-image" />
      <div className="flower-info">
        <h3>{flower.name}</h3>
        <p className="flower-description">{flower.description}</p>
        <p className="flower-price">{flower.price} ₽</p>
        <p className="flower-stock">В наличии: {flower.stock} шт.</p>
      </div>
      <div className="flower-actions">
        {canEdit && (
          <button className="edit-button" onClick={() => onEdit(flower)}>
            Редактировать
          </button>
        )}
        {canDelete && (
          <button className="delete-button" onClick={handleDelete}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export default FlowerCard; 