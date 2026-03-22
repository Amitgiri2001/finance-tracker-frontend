import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_PROD_URL ||
    import.meta.env.VITE_API_LOCAL_URL ||
    "http://localhost:8080/api",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

// 🔥 Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
