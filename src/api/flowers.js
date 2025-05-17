import axios from 'axios';

const API_URL = 'http://localhost:5000/api/flowers';

export const getFlowers = async (token) => {
  try {
    console.log('getFlowers - Starting request with token:', token);
    
    if (!token) {
      console.error('getFlowers - No token provided');
      throw new Error('Токен авторизации отсутствует');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    console.log('getFlowers - Request config:', config);
    console.log('getFlowers - Making request to:', API_URL);
    
    const response = await axios.get(API_URL, config);
    console.log('getFlowers - Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('getFlowers - Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
};

const createFlower = async (flowerData, token) => {
  try {
    console.log('createFlower - Starting request with token:', token);
    console.log('createFlower - Flower data:', flowerData);
    
    if (!token) {
      throw new Error('Токен авторизации отсутствует');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    console.log('createFlower - Request config:', config);
    const response = await axios.post(API_URL, flowerData, config);
    console.log('createFlower - Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('createFlower - Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

const updateFlower = async (id, flowerData, token) => {
  try {
    console.log('updateFlower - Starting update for flower:', {
      id,
      data: flowerData
    });
    console.log('updateFlower - Using token:', token);
    
    if (!token) {
      console.error('updateFlower - No token provided');
      throw new Error('Требуется авторизация');
    }
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    console.log('updateFlower - Request config:', config);
    const requestUrl = `${API_URL}/${id}`;
    console.log('updateFlower - Request URL:', requestUrl);
    
    const response = await axios.put(requestUrl, flowerData, config);
    console.log('updateFlower - Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('updateFlower - Error details:', {
      message: error.message,
      response: error.response,
      status: error.response?.status
    });
    throw error;
  }
};

export const deleteFlower = async (id, token) => {
  try {
    console.log('deleteFlower - Attempting to delete flower with ID:', id);
    console.log('deleteFlower - Using token:', token);
    
    if (!token) {
      throw new Error('Токен авторизации отсутствует');
    }
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    console.log('deleteFlower - Request config:', config);
    const requestUrl = `${API_URL}/${id}`;
    console.log('deleteFlower - Request URL:', requestUrl);
    
    const response = await axios.delete(requestUrl, config);
    console.log('deleteFlower - Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('deleteFlower - Error details:', {
      message: error.message,
      response: error.response,
      status: error.response?.status
    });
    
    if (error.response?.status === 404) {
      throw new Error('Цветок не найден');
    } else if (error.response?.status === 401) {
      throw new Error('Требуется авторизация');
    } else if (error.response?.status === 403) {
      throw new Error('Нет прав для удаления цветка');
    } else {
      throw new Error('Ошибка при удалении цветка');
    }
  }
};

const flowerService = {
  getFlowers,
  createFlower,
  updateFlower,
  deleteFlower
};

export default flowerService;