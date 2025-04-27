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
        alert("Kindly login to continue ");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // try to refresh the token
        const res = await axiosNoInterceptors.post(`user/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("access", res.data.access);

        // Clone the original request and update Authorization header
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        if (
          refreshError.response?.data?.code === "token_not_valid" ||
          refreshError.response?.status === 401
        ) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          alert("Session expired, kindly log in again.");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const axiosNoInterceptors = axios.create({
  baseURL: baseUrl,
});
