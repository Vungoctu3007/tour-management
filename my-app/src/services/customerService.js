import httpRequest from '../utils/httpRequest';

export const getListCustomer = async (page, size) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get(`/admin/customer?page=${page}&size=${size}`, {
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

export const searchCustomer = async (username, page = 1, size = 5) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get(`/admin/customer/search`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { username, page, size }, // Thêm tham số page và size
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

