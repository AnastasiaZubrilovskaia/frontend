const TopCustomers = ({ customers }) => {
    return (
      <div className="top-customers">
        <h3>Top Customers</h3>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Total Spent</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer._id}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
                <td>{customer.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TopCustomers;