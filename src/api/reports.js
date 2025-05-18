import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports';

const getSalesByCategory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/sales-by-category`, config);
  return response.data;
};

const getTopCustomers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/top-customers`, config);
  return response.data;
};


const reportService = {
  getSalesByCategory,
  getTopCustomers
};

export default reportService;