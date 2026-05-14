import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

export const getDashboardData = (token) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDietPreferences = (token, preferences) => {
  return axios.put(`${API}/preferences`, preferences, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};