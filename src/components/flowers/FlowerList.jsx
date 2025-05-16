import { useState } from 'react';
import FlowerCard from './FlowerCard';
import FlowerForm from './FlowerForm';

const FlowerList = ({ flowers, onUpdateList }) => {
  const [editingFlower, setEditingFlower] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleUpdate = (flower) => {
    setEditingFlower(flower);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    onUpdateList(flowers.filter(f => f._id !== id));
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