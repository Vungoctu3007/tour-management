import httpRequest from "../utils/httpRequest";
export const getFeedbackList = async (page, size, detailRouteId) => {
  try {
    const response = await httpRequest.get(
      `/feedback?detailRouteId=${detailRouteId}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback");
    throw error;
  }
};
export const createFeedback = async () => {
  try {
    const response = await httpRequest.post(`/feedback/comment`);
    return response.data;
  } catch (error) {
    console.error("Error creating feedback");
    throw error;
  }
};
export const checkCustomerOrderTour = async (userId, detailRouteId) => {
  try {
    const response = await httpRequest.get(
      `/feedback/checkBooking?userId=${userId}&detailRouteId=${detailRouteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating feedback");
    throw error;
  }
};
