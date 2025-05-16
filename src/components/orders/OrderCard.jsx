const OrderCard = ({ order }) => {
    return (
      <div className="order-card">
        <h3>Order #{order._id.slice(-6)}</h3>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Status: {order.status}</p>
        <p>Total: ${order.total}</p>
        <div className="order-items">
          <h4>Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.flowerId?.name || 'Deleted flower'} - 
                {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default OrderCard;