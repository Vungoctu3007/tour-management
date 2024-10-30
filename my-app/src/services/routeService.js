import httpRequest from "../utils/httpRequest";
export const getAllRoutes=async ()=>{
    try{
        const response=await httpRequest.get("/route");
        return response.data;
    }catch(error){
        console.error("Error fetching user")
        throw error;
    }
}