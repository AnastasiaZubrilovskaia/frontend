import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="header">
      <nav className="nav">
        {/* Основные ссылки для всех */}
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/flowers" className="nav-link">Каталог</Link>

        {/* Для авторизованных пользователей */}
        {user && (
          <>
            {/* Корзина и заказы только для покупателей */}
            {user.role === 'customer' && (
              <>
                <Link to="/cart" className="nav-link">
                  Корзина ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
                <Link to="/orders" className="nav-link">Мои заказы</Link>
              </>
            )}

            {/* Управление для админов/менеджеров */}
            {['manager', 'admin'].includes(user.role) && (
              <>
                <Link to="/admin/orders" className="nav-link">Заказы</Link>
              </>
            )}

            {/* Для админов */}
            {user.role === 'admin' && (
              <>
                <Link to="/admin/users" className="nav-link">Пользователи</Link>
                <Link to="/admin/reports" className="nav-link">Отчеты</Link>
              </>
            )}

            {/* Кнопка выхода */}
            <button onClick={logout} className="logout-btn">
              Выйти ({user.name})
            </button>
          </>
        )}

        {/* Для гостей */}
        {!user && (
          <Link to="/auth" className="nav-link">Войти</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;