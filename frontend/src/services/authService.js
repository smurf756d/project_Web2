import axios from "axios";

const API = ${import.meta.env.VITE_API_URL}/auth;

export const register = async (data) => {
  const response = await axios.post(${API}/register, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(${API}/login, data);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(${API}/profile, {
    headers: {
      Authorization: Bearer ${token},
    },
  });

  return response.data;
};