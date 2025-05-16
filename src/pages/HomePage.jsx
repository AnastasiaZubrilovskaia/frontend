import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h1>Welcome to Flower Shop</h1>
      {user ? (
        <p>Hello, {user.name}! Browse our collection of beautiful flowers.</p>
      ) : (
        <p>Please login or register to start shopping.</p>
      )}
    </div>
  );
};

export default HomePage;