import httpRequest from "../utils/httpRequest";
export const getUsers = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJseXRydW9uZyIsInVzZXJfaWQiOjAsInNjb3BlIjoiUk9MRV9BZG1pbiIsImlzcyI6ImhvYW5ndHVhbi5jb20iLCJleHAiOjE3Mjk5MjU2MjgsImlhdCI6MTcyOTkyMjAyOCwianRpIjoiODk3NGQ5ZDgtNzhlMi00NDlhLTg5ODQtOGNmYmJkZTcwZDZhIn0.OJ5h1nvcqq-5h_teLdoH6W97iQeMDyPUk7vbeQvumDhepAPtI02zJ-rH1QLKCPHFoCbqxG43Y-CH4nSwD4TKIg";
    const response = await httpRequest.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user");
    throw error;
  }
};
export const getTour = async () => {
  try {
    const response = await httpRequest.get("/tour");
    return response.data;
  } catch (error) {
    console.error("Error fetching user");
    throw error;
  }
};
export const getListUser = async (page, size) => {
  try {
    const response = await httpRequest.get(`/user?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user");
    throw error;
  }
};
export const getUserByAllSearch = async (username) => {
  try {
    const response = await httpRequest.get(`/user/search?username=${username}`);
    return response.data;
  } catch (error) {}
};
export const getAllRole = async () => {
  try {
    const response = await httpRequest.get(`/role`);
    return response.data;
  } catch (error) {}
};
