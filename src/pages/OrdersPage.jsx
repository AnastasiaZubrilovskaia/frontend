import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import orderService from '../api/orders';
import OrderList from '../components/orders/OrderList';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let data;
        if (['manager', 'admin'].includes(user?.role)) {
          data = await orderService.getOrders(token);
        } else {
          data = await orderService.getUserOrders(token);
        }
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  return (
    <div className="orders-page">
      <h1>{['manager', 'admin'].includes(user?.role) ? 'Все заказы' : 'Мои заказы'}</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
