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


export const getAllOperation = async () => {
  try { 
    const response = await fetch(`/api/decentralization/getAllOperations`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return null;
  }
};

export const getOperationByRoleId = async (roleId) => {
  try {
    const response = await fetch(`/api/decentralization/getOperationById?roleId=${roleId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching operations:", error);
    return null;
  }
}


export const updatePermissions = async (roleId, permissions) => {
  try {
    const response = await httpRequest.post("/decentralization/updatePermissions", {
      roleId,
      permissions,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating permissions:", error);
    throw error;
  }
};

export const addPermission = async (roleId, permissions) => {
  try {
    const response = await httpRequest.post("/decentralization/addPermissions", {
      roleId,
      permissions,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding permissions:", error);
    throw error;
  }
};



export const getAssignedPermissions = async (roleId) => {
  try {
    const response = await httpRequest.get(`/decentralization/unassigned-permissions?roleId=${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching decentralization");
    throw error;
  }
};




