import httpRequest from '../utils/httpRequest';
export const getFeedbackListAdmin = async (page, size, detailRouteId) => {
    try {
        const response = await httpRequest.get(
            `/admin/feedback/admin?detailRouteId=${detailRouteId}&page=${page}&size=${size}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback');
        throw error;
    }
};

export const getFeedbackListClient = async (page, size, detailRouteId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await httpRequest.get(
            `/admin/feedback/client?detailRouteId=${detailRouteId}&page=${page}&size=${size}`,
            {
                headers: { 
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback');
        throw error;
    }
};
export const createFeedback = async () => {
    try {
        const response = await httpRequest.post(`/feedback/comment`);
        return response.data;
    } catch (error) {
        console.error('Error creating feedback');
        throw error;
    }
};
export const checkCustomerOrderTour = async (userId, detailRouteId) => {
    try {
        const response = await httpRequest.get(
            `/feedback/checkBooking?userId=${userId}&detailRouteId=${detailRouteId}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error creating feedback');
        throw error;
    }
};

export const searchFeedbackByDetailName = async (detailRouteName, page, size) => {
    try {
        const response = await httpRequest.get(`/feedback/search?detailRouteName=${detailRouteName}`);
        return response.data;
    } catch (error) {
        console.error('Error search feedback');
        throw error;
    }
};
