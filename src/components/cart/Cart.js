import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderService from '../api/orders';

const Cart = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    try {
      const order = {
        items: cart.map(item => ({
          flowerId: item.flower._id,
          quantity: item.quantity,
          price: item.flower.price
        })),
        total
      };

      await orderService.createOrder(order, user.token);
      clearCart();
      setMessage('Заказ успешно оформлен!');
    } catch (error) {
      setMessage('Ошибка при оформлении заказа');
    }
  };

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cart.map(item => (
        <div key={item.flower._id} className="cart-item">
          <h4>{item.flower.name}</h4>
          <p>Количество: {item.quantity}</p>
          <p>Цена: ${item.flower.price * item.quantity}</p>
        </div>
      ))}
      <p>Итого: ${total}</p>
      <button onClick={handleCheckout} disabled={!user || cart.length === 0}>
        Оформить заказ
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};