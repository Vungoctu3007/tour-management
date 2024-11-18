import httpRequest from "../utils/httpRequest";
export const searchPromotion = async (searchQuery) => {
  try {
    const response = await httpRequest.get("/promotions/search", {
      params: { query: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPromotion = async (page, size) => {
  try {
    const response = await httpRequest.get(
      `/promotion?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user");
    throw error;
  }
};
export const addPromotion = async (promotionData) => {
    try {
      const response = await httpRequest.post("/promotions", promotionData);
      return response.data; // Trả về kết quả từ backend
    } catch (error) {
      console.error("Error adding promotion:", error);
      throw error;
    }
  };
  export const updatePromotion = async (promotionId, promotionData) => {
    try {
      const response = await httpRequest.put(`/promotions/${promotionId}`, promotionData);
      return response.data; // Trả về kết quả từ backend
    } catch (error) {
      console.error("Error updating promotion:", error);
      throw error;
    }
  };
  export const deletePromotion = async (promotionId) => {
    try {
      const response = await httpRequest.delete(`/promotions/${promotionId}`);
      return response.data; // Trả về kết quả từ backend
    } catch (error) {
      console.error("Error deleting promotion:", error);
      throw error;
    }
  };
      