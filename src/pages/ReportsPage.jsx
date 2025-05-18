import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import reportService from '../api/reports';
import SalesChart from '../components/reports/SalesChart';
import TopCustomers from '../components/reports/TopCustomers';

const ReportsPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const sales = await reportService.getSalesByCategory(token);
        const customers = await reportService.getTopCustomers(token);
        
        setSalesData(sales);
        setTopCustomers(customers);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    if (user && token) {
      fetchReports();
    }
  }, [user, token]);

  return (
    <div className="reports-page">
      <h1>Отчеты</h1>
      
      <section className="report-section">
        <h2>Продажи по категориям</h2>
        <SalesChart data={salesData} />
      </section>

      {user?.role === 'admin' && (
        <section className="report-section">
          <h2>Топ покупателей</h2>
          <TopCustomers customers={topCustomers} />
        </section>
      )}
    </div>
  );
};

export default ReportsPage;