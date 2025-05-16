import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getUserOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

const orderService = {
  getOrders,
  getUserOrders,
  createOrder
};

export default orderService;