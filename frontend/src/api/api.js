import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute =
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.replace("/");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
