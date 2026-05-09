import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;

/**
 * Register new user.
 */
export const register = (data) =>
    axios.post(`${API}/register`, data);

/**
 * Login existing user.
 */
export const login = (data) =>
    axios.post(`${API}/login`, data);

/**
 * Get logged-in user profile.
 */
export const getProfile = (token) =>
    axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });