import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

const jwtToken = localStorage.getItem('token');

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'contentType': 'application/json',
    'Authorization': `Bearer ${jwtToken}`
  }
});

export const register = async (data) => {
  try {
    delete apiService.defaults.headers.common['Authorization'];

    const response = await apiService.post(`/register`, data);
    const token = response.data.token;

    // Set Authorization header with the obtained token
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const login = async (username, password) => {
  const data = {
    username,
    password
  };

  try {
    delete apiService.defaults.headers.common['Authorization'];

    const response = await apiService.post(`/login`, data);
    const token = response.data.token;

    // Set Authorization header with the obtained token
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const isManager = async ( empId ) => {
  const response = await apiService.get(`/employee/${empId}/isManager`);

  return response.data.isManager;
}

export const fetchManager = async () => {
  try {
    const empId = localStorage.getItem('id');

    const response = await apiService.get(`/employee/${empId}/manager`);
    return response.data.manager;

  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const fetchPositions = async () => {
  try {
    const isMan = localStorage.getItem('isMan'); 

    const managerId = (isMan === "true") ? localStorage.getItem('id') : (await fetchManager())._id;


    const response = await apiService.get(`/positions/${managerId}`);
    return response.data.positions;

  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};



export default apiService;
