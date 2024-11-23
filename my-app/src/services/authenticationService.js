import httpRequest from "../utils/httpRequest";
// export const getGoogleOauth = async () => {
//     try {
//         const response = await httpRequest.get("/google-client-id");
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching data google");
//         throw error;
//       }
// }

// export const getApiLogin = async () => {
//   try {
//       const response = await httpRequest.get("/login/oauth2/google");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching login google");
//       throw error;
//     }
// }
export const loginUser = async ({ username, password }) => {
    try {
      const response = await httpRequest.post('/auth/login', {
        username,
        password,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Kiểm tra phản hồi
      if (response.data.code !== 1000) {
        throw new Error(response.data.message);
      }
  
      return response.data.result; // Trả về dữ liệu từ API
    } catch (error) {
    console.error("Error logging in:", error);
      throw error.response?.data || error.message;
    }
  };
  
  export const handleOAuthCallback = async (provider, code) => {
    try {
      const response = await httpRequest.post(
        `   /auth/oauth2/callback/${provider}`,
        { code }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };


export const decodeToken = async (token) => {
    try {
      const response = await httpRequest.post("/auth/decode-token", null, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token in the Authorization header
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error;
    }
  };

export const refreshToken = async (currentToken) => {
    try {
        const response = await httpRequest.post(
            "/auth/refresh",
            { token: currentToken }, // Gửi token cũ trong body
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`, // Gửi token cũ trong header
                },
            }
        );
        console.log("Refresh API response:", response.data); // Log phản hồi từ API
        const newToken = response.data.result?.token; // Lấy token mới từ phản hồi

        if (!newToken) {
            throw new Error("No token returned from refresh API");
        }

        // Cập nhật token mới vào localStorage
        localStorage.setItem("token", newToken);
        return newToken; // Trả về token mới
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error; // Ném lỗi để xử lý tiếp
    }
};



let refreshInterval;

export const setupAutoRefreshToken = () => {
    const refreshCycle = 60 * 60 * 1000; // 1 phút (ms)

    const refreshFunction = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                console.log("Automatically refreshing token...");
                await refreshToken(token); // Gọi API refresh token
            } catch (error) {
                console.error("Failed to automatically refresh token:", error);
            }
        }
    };

    // Xóa chu kỳ làm mới trước đó (nếu có)
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }

    // Thiết lập chu kỳ làm mới mới
    refreshInterval = setInterval(refreshFunction, refreshCycle);
};

export const clearAutoRefreshToken = () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
};

  