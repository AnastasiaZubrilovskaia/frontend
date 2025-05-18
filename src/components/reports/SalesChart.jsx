import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

//Интерактивная столбчатая диаграмма
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = ({ data }) => {
  //Создает структуру данных, которую ожидает Chart.js
  const chartData = {
    labels: data.map(item => item._id), //названия категорий (ось X)
    datasets: [ //наборы данных:
      {
        label: 'Общий объем продаж',
        data: data.map(item => item.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Проданные товары',
        data: data.map(item => item.totalItems),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  //Настройки диаграммы
  const options = {
    responsive: true, // Адаптивность
    plugins: {
      legend: {
        position: 'top',  // Позиция легенды
      },
      title: {
        display: true,
        text: 'Продажи по категориям',
      },
    },
    scales: {
      y: {
        beginAtZero: true // Ось Y начинается с 0
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesChart;