import httpRequest from '../utils/httpRequest';
export const getAllRoutes = async (page, size, sort) => {
    try {
        const response = await httpRequest.get(`/route?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user');
        throw error;
    }
};
export const getRouteDetailById = async (id) => {
    try {
        const response = await httpRequest.get(`/route/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching route');
    }
};
export const getRouteByAllSearch = async (arrivalName, departureName, timeToDeparture, page, size, sort) => {
    try {
        const response = await httpRequest.get(
            `/route/search?arrivalName=${arrivalName}&departureName=${departureName}&timeToDeparture=${timeToDeparture}&page=${page}&size=${size}&sort=${sort}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching route');
    }
};
export const getRouteFilter = async (arrivalName, page, size, sort) => {
    try {
        const response = await httpRequest.get(
            `/route/filter-arrivalName?arrivalName=${arrivalName}&page=${page}&size=${size}&sort=${sort}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching route');
    }
};

export const getAllRouteRoad = async () => {
    try {
        const response = await httpRequest.get('route/road');
        return response.data;
    } catch (error) {
        console.error('Error fetching route');
    }
};
