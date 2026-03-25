import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_PROD_URL ||
    import.meta.env.VITE_API_LOCAL_URL ||
    "http://localhost:8080/api",
});

// ✅ Request interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ Response interceptor (FIXED)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("error :", err);

    const status = err.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token"); // optional
      window.location.href = "/login";
    }

    return Promise.reject(err);
  },
);

export default API;
