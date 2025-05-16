import OrderCard from './OrderCard';

const OrderList = ({ orders }) => {
  return (
    <div className="order-list">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <OrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
};

export default OrderList;