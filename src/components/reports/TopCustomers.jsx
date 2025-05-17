const TopCustomers = ({ customers }) => {
    return (
      <div className="top-customers">
        <h3>Лучшие клиенты</h3>
        <table>
          <thead>
            <tr>
              <th>Клиент</th>
              <th>Потрачено</th>
              <th>Заказов</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name} ({customer.email})</td>
                <td>{customer.totalSpent.toFixed(2)}</td>
                <td>{customer.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TopCustomers;