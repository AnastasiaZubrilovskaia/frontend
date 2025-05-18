import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h1>Добро пожаловать в Цветочный магазин</h1>
      {user ? (
        <p>Hello, {user.name}! Посмотрите нашу коллекцию цветов.</p>
      ) : (
        <p>Пожалуйста, зарегистрируйтесь или войдите, чтобы совершать покупки.</p>
      )}
    </div>
  );
};

export default HomePage;