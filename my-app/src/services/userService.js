import httpRequest from '../utils/httpRequest';

export const getUsers = async () => {
    try {
        const token =
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJseXRydW9uZyIsInVzZXJfaWQiOjAsInNjb3BlIjoiUk9MRV9BZG1pbiIsImlzcyI6ImhvYW5ndHVhbi5jb20iLCJleHAiOjE3Mjk5MjU2MjgsImlhdCI6MTcyOTkyMjAyOCwianRpIjoiODk3NGQ5ZDgtNzhlMi00NDlhLTg5ODQtOGNmYmJkZTcwZDZhIn0.OJ5h1nvcqq-5h_teLdoH6W97iQeMDyPUk7vbeQvumDhepAPtI02zJ-rH1QLKCPHFoCbqxG43Y-CH4nSwD4TKIg';
        const response = await httpRequest.get('/admin/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user');
        throw error;
    }
};
export const getTour = async () => {
    try {
        const response = await httpRequest.get('/tour');
        return response.data;
    } catch (error) {
        console.error('Error fetching user');
        throw error;
    }
};
export const getListUser = async (page, size) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found');
            throw new Error('Token is missing. Please log in again.');
        }

        const response = await httpRequest.get(`/admin/user?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
};

export const getUserByAllSearch = async (username) => {
    try {
        const token = localStorage.getItem('token');

        const response = await httpRequest.get(`/admin/user/search?username=${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {}
};

export const getAllRole = async (token) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get(`/admin/role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching roles');
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await httpRequest.get(`/auth/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID');
        throw error;
    }
};

export const verifyEmailToken = async (token) => {
    try {
        const response = await httpRequest.post('/auth/verify', { token });
        return response.data;
    } catch (error) {
        console.error('Error verifying email token:', error);
        throw error;
    }
};

export const addAccount = async (username, password, email) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.post(
            '/api/admin/user/create',
            {
                username,
                email,
                password,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data; // Trả về phản hồi thành công từ server
    } catch (error) {
        // Xử lý lỗi từ server
        const serverError = error.response?.data;
        if (serverError?.message) {
            throw new Error(serverError.message); // Ném thông báo lỗi để xử lý bên ngoài
        }
        throw new Error(error.message || 'Đã xảy ra lỗi không xác định');
    }
};

export const updateUser = async (userId, updatedUser) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.put(`/admin/user/update/${userId}`, updatedUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const blockUser = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.put(
            `/admin/user/${userId}?status=0`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error blocking user:', error);
        throw error;
    }
};

// trưởng
export const GetProfileByUserId = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get(`/admin/customer/getCustomerById?userId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user');
        throw error;
    }
};

export const UpdateProfileByUserId = async (userId, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.put(`/admin/customer/update?userId=${userId}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const registerUser = async ({ username, email, password }) => {
  try {
      const response = await httpRequest.post(
          '/auth/register', // Endpoint chính xác
          { username, email, password }, // Body
          { 
              headers: {
                  'Content-Type': 'application/json', // Chỉ thêm Content-Type,
                  'Authorization' : 'No Authorization'
              },
          },
      );
      return response.data;
  } catch (error) {
      // Xử lý lỗi từ server
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong!';
      throw new Error(errorMessage);
  }
};
