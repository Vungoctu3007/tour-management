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

export const checkAvailablequantity = async (detailRouteId, totalPassengers) => {
    try {
        const response = await httpRequest.get('/booking/check-available-quantity', {
            params: {
                detailRouteId: detailRouteId,
                totalPassengers: totalPassengers
            }
        });
        return response.data; // Trả về dữ liệu từ API
    } catch(error) {
        console.error("Error fetching booking", error);
        throw error;
    }
};

export const getAllBookingsInformationByUserId = async (userId, page, size, sort) => {
    try {
        const response = await httpRequest.get(`/booking/get-all-booking-by-user?userId=${userId}&page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (e) {
        console.error("Error fetching booking", e);
        throw e;
    }
}

export const getBookingDetailById = async (bookingId) => {
    try {
        const response = await httpRequest.get(`/booking/get-detail-booking/${bookingId}`);
        return response.data;
    } catch (e) {
        console.error("Error fetching booking", e);
        throw e;
    }
}