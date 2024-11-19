import axios from "axios";
import { refreshToken } from "../services/authenticationService";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Base URL lấy từ biến môi trường
});

httpRequest.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("token");

      // Kiểm tra và làm mới token nếu sắp hết hạn
      const isTokenExpiringSoon = () => {
        try {
          const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode payload của token
          const expTime = tokenData.exp * 1000; // Chuyển thời gian hết hạn sang milliseconds
          return expTime - Date.now() < 1 * 60 * 1000; // Token còn dưới 5 phút sẽ làm mới
        } catch (error) {
          console.error("Error decoding token:", error);
          return false;
        }
      };

      if (token && isTokenExpiringSoon()) {
        try {
          console.log("Refreshing token...");
          token = await refreshToken(token); // Gọi refreshToken để lấy token mới
          console.log("New token after refresh:", token);
          config.headers["Authorization"] = `Bearer ${token}`; // Gắn token mới vào header
        } catch (error) {
          console.error("Failed to refresh token:", error);
          localStorage.removeItem("token"); // Xóa token không hợp lệ
          window.location.href = "/login"; // Điều hướng người dùng về login
          throw error; // Ngừng xử lý request
        }
      }

      // Gắn token hiện tại vào header (nếu có)
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default httpRequest;
