import axios from "axios";
import { refreshToken } from "../services/authenticationService";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Base URL từ biến môi trường
});

let isRefreshing = false; // Cờ kiểm soát việc refresh token
let refreshSubscribers = []; // Danh sách các request đang chờ

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

httpRequest.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      const isTokenExpiringSoon = () => {
        try {
          const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode payload của token
          const expTime = tokenData.exp * 1000; // Thời gian hết hạn tính bằng milliseconds
          return expTime - Date.now() < 5 * 60 * 1000; // Token còn dưới 5 phút sẽ làm mới
        } catch (error) {
          console.error("Error decoding token:", error);
          return false;
        }
      };

      if (isTokenExpiringSoon()) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await refreshToken(token); // Gọi API refresh token
            localStorage.setItem("token", newToken); // Lưu token mới
            isRefreshing = false;
            onTokenRefreshed(newToken); // Cập nhật token mới cho các request đang chờ
          } catch (error) {
            isRefreshing = false;
            localStorage.removeItem("token");
            window.location.href = "/login"; // Chuyển người dùng về login
            throw error; // Ngừng xử lý request
          }
        }

        // Xếp request vào hàng chờ
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            config.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }

      // Gắn token hiện tại vào header
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpRequest;
