import axios from "axios";

const API_URL = "https://frontend-take-home-service.fetch.com";

// Login function
export const login = async (name, email) => {
  const response = await axios.post(`${API_URL}/auth/login`, { name, email }, { withCredentials: true });
  return response.data;
};

// Logout
export const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  };