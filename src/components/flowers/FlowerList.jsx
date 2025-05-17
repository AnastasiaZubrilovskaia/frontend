import { useState } from 'react';
import FlowerCard from './FlowerCard';
import FlowerForm from './FlowerForm';
import { useAuth } from '../../context/AuthContext';
import flowerService from '../../api/flowers';

const FlowerList = ({ flowers, onUpdateList, onAddToCart }) => {
  const { user } = useAuth();
  const [editingFlower, setEditingFlower] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleUpdate = (flower) => {
    setEditingFlower(flower);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flower?')) {
      try {
        await flowerService.deleteFlower(id);
        onUpdateList();
      } catch (error) {
        console.error('Failed to delete flower:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingFlower(null);
    onUpdateList();
  };

  return (
    <div className="flower-list">
      {showForm ? (
        <FlowerForm 
          flower={editingFlower} 
          onSuccess={handleFormSuccess} 
        />
      ) : (
        <>
          {flowers.map(flower => (
            <FlowerCard
              key={flower._id}
              flower={flower}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FlowerList;