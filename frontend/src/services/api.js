// import axios from "axios";

// // Base URL ko hamesha backend ke /api path par lock karein
// const rawURL = import.meta.env.VITE_API_URL || "https://patel-global-green-backend.onrender.com";
// const normalizedBaseURL = rawURL.replace(/\/+$/, "");
// const baseURL = normalizedBaseURL.endsWith("/api")
//   ? normalizedBaseURL
//   : `${normalizedBaseURL}/api`;

// const api = axios.create({
//   baseURL: baseURL,
// });

// // Request Interceptor: Token attach karega + Double /api ko remove karega
// api.interceptors.request.use(
//   (config) => {
//     // 1. Agar kisi component ne '/api/products' bheja hai toh use '/products' bana dega
//     // taaki baseURL ke sath milkar '/api/api/products' na bane
//     if (config.url) {
//       config.url = config.url.replace(/^\/?api\//, "/");
//     }

//     // 2. Token attach karein
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";

// Local development me localhost use hoga, production build me Render live link
const isDevelopment = import.meta.env.DEV;

const defaultURL = isDevelopment
  ? "http://localhost:5000"
  : "https://patel-global-green-backend.onrender.com";

const rawURL = import.meta.env.VITE_API_URL || defaultURL;

const normalizedBaseURL = rawURL.replace(/\/+$/, "");
const baseURL = normalizedBaseURL.endsWith("/api")
  ? normalizedBaseURL
  : `${normalizedBaseURL}/api`;

const api = axios.create({
  baseURL: baseURL,
});

// Request Interceptor: Token attach + Double /api removal
api.interceptors.request.use(
  (config) => {
    if (config.url) {
      config.url = config.url.replace(/^\/?api\//, "/");
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;