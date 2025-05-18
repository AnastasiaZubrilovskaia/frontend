import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'; 

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user, token } = useAuth();
  const [error, setError] = useState(null); 

  //расчет общей суммы
  const total = cart.reduce((sum, item) => {
    return sum + (item.flower?.price || 0) * item.quantity;
  }, 0);

  //оформление заказа
  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cart.map(item => ({
          flowerId: item.flower._id,
          quantity: item.quantity,
          price: item.flower.price
        })),
        total: total
      };

      const response = await axios.post('http://localhost:5000/api/orders', 
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        clearCart(); // Очистка корзины после успешного заказа
        setError(null);
        alert('Заказ успешно оформлен!');
      }
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      setError('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className="cart-page">
      <h1>Ваша корзина</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Ваша корзина пуста</h2>
          <p>Перейдите в каталог, чтобы добавить товары</p>
          <Link to="/flowers" className="browse-btn">
            Перейти к покупкам
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.flower._id} className="cart-item">
                <div className="item-details">
                  <h3>{item.flower.name}</h3>
                  <p className="item-category">{item.flower.category}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.flower._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.flower._id, item.quantity + 1)}
                      disabled={item.quantity >= item.flower.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <p>{((item.flower?.price || 0) * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.flower._id)}
                    className="remove-btn"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Итого</h3>
            <div className="summary-row">
              <span>Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span>{total.toFixed(2)} ₽</span>
            </div>
            <button 
              className="checkout-btn"
              disabled={!user}
              onClick={handleCheckout}
            >
              {user ? 'Оформить заказ' : 'Войдите для оформления'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;