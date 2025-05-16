import axios from 'axios';

const API_URL = 'http://localhost:5000/api/flowers';

export const getFlowers = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const createFlower = async (flowerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, flowerData, config);
  return response.data;
};

const updateFlower = async (id, flowerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(`${API_URL}/${id}`, flowerData, config);
  return response.data;
};

const deleteFlower = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const flowerService = {
  getFlowers,
  createFlower,
  updateFlower,
  deleteFlower
};

export default flowerService;