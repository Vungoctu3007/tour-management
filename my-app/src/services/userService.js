import httpRequest from "../utils/httpRequest";
export const getUsers=async ()=>{
    try {
        const response=await httpRequest.get("/user")
        return response.data;
    } catch (error) {
        console.error("Error fetching user")
        throw error;
    }
}
export const getTour=async ()=>{
    try {
        const response=await httpRequest.get("/tour")
        return response.data;
    } catch (error) {
        console.error("Error fetching user")
        throw error;
    }
}