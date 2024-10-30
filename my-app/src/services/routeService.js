import httpRequest from "../utils/httpRequest";
export const getAllRoutes=async (page,size)=>{
    try{
        const response=await httpRequest.get(`/route?page=${page}&size=${size}`);
        return response.data;
    }catch(error){
        console.error("Error fetching user")
        throw error;
    }
}