import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Total Sales',
        data: data.map(item => item.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Items Sold',
        data: data.map(item => item.totalItems),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesChart;