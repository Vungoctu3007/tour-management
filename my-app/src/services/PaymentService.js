import httpRequest from "../utils/httpRequest";

export const getAllPaymentMethods = async () => {
  try {
    const response = await httpRequest.get(`/payment/getAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching route");
  }
}