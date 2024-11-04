import httpRequest from "../utils/httpRequest";

export const getRouteDetailById = async (id) => {
    try {
      const response = await httpRequest.get(`/booking/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching route");
    }
  };