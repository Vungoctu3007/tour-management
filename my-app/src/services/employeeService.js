import httpRequest from '../utils/httpRequest'; // Tùy thuộc vào cách bạn cấu hình httpRequest

export const getListEmployee = async (page = 1, size = 5) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get(`/admin/employee`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { page, size }, // Truyền tham số phân trang
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const searchEmployee = async (email, page = 1, size = 5) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get('/admin/employee/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { email, page, size }, // Đảm bảo truyền email, page, size
        });
        return response.data;
    } catch (error) {
        console.error('Error searching employees:', error);
        throw error;
    }
};
