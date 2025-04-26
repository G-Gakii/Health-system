import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        alert("Kindly re-login ");
      }
      try {
        // try to refresh the token
        const res = await axios.post(`${baseUrl}user/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("access", res.data.access);

        // Clone the original request and update Authorization header
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Token refresh failed, user must re-login.");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
