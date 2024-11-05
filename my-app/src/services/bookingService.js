import httpRequest from "../utils/httpRequest";

export const getRouteDetailById = async (id) => {
    try {
        const response = await httpRequest.get(`/booking/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching route");
    }
};

export const handleBooking = async (payload) => {
    try {
        const response = await httpRequest.post(`/booking/handle-booking`, payload);
        return response.data;
    } catch (error) {
        console.error("Error handling booking:", error);
        throw error; // Rethrow to handle it in the caller
    }
};

