import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import flowerService from '../api/flowers';
import FlowerList from '../components/flowers/FlowerList';
import FlowerForm from '../components/flowers/FlowerForm';

const FlowersPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user, token } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const data = await flowerService.getFlowers(token);
        setFlowers(data);
      } catch (error) {
        console.error('Failed to fetch flowers:', error);
      }
    };
    if (token) {
      fetchFlowers();
    }
  }, [token]);

  const handleAddToCart = (flower) => {
    addToCart(flower);
  };

  const handleUpdateList = async () => {
    const data = await flowerService.getFlowers(token);
    setFlowers(data);
    setShowForm(false);
  };

  return (
    <div className="flowers-page">
      <h1>Our Flowers</h1>
      
      {['manager', 'admin'].includes(user?.role) && (
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Flower'}
        </button>
      )}

      {showForm ? (
        <FlowerForm onSuccess={handleUpdateList} />
      ) : (
        <FlowerList 
          flowers={flowers} 
          onUpdateList={handleUpdateList}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default FlowersPage;