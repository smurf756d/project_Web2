import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

/**
 * Attach JWT token to protected API requests
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;