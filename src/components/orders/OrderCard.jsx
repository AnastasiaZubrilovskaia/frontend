const OrderCard = ({ order }) => {
    return (
      <div className="order-card">
        <h3>Заказ №{order._id.slice(-6).replace(/[^0-9]/g, '')}</h3>
        <p>Дата: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Статус: {order.status}</p>
        <p>Итого: {order.total}</p>
        <div className="order-items">
          <h4>Товары:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.flowerId?.name || 'Цветы'} - 
                {item.quantity} x {item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default OrderCard;