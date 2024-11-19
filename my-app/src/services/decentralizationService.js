import httpRequest from "../utils/httpRequest";

export const getListDecentralization = async (page, size) => {
    try {
      const response = await httpRequest.get(`/decentralization?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching decentralization");
      throw error;
    }
  };


export const getAllPermission = async () => {
  try { 
    const response = await fetch(`/api/decentralization/getPermission`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return null;
  }
};

export const getPermissionByRoleId = async (roleId) => {
  try {
    const response = await fetch(`/api/decentralization/getPermissionById?roleId=${roleId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return null;
  }
}

export const updatePermissions = async (roleId, permissionIds) => {
  try {
    const response = await httpRequest.post("/decentralization/updatePermissions", {
      roleId,
      permissionIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating permissions:", error);
    throw error;
  }
};

