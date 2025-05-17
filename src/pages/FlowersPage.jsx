import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import FlowerList from '../components/flowers/FlowerList';

const FlowersPage = () => {
  const { user, token } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (flower) => {
    addToCart(flower);
  };

  return (
    <div className="flowers-page">
      <FlowerList 
        onAddToCart={handleAddToCart}
        token={token}
        user={user}
      />
    </div>
  );
};

export default FlowersPage;
