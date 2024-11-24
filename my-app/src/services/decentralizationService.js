import httpRequest from "../utils/httpRequest";

export const getListDecentralization = async (page, size) => {
    try {
      const token = localStorage.getItem('token')
      const response = await httpRequest.get(`/admin/decentralization?page=${page}&size=${size}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching decentralization");
      throw error;
    }
  };


export const getAllPermission = async () => {
  try { 
    const token = localStorage.getItem('token')
    console.log(token)
    const response = await fetch(`/api/admin/decentralization/getPermission`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },  
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return null;
  }
};




export const getPermissionByRoleId = async (roleId) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`/admin/decentralization/getPermissionById?roleId=${roleId}`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return null;
  }
}


export const getAllOperation = async () => {
  try { 
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/admin/decentralization/getAllOperations`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return null;
  }
};

export const getOperationByRoleId = async (roleId) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/admin/decentralization/getOperationById?roleId=${roleId}`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching operations:", error);
    return null;
  }
}


export const updatePermissions = async (roleId, permissions) => {
  try {
    const token = localStorage.getItem('token')
    const response = await httpRequest.post("/admin/decentralization/updatePermissions", {
      roleId,
      permissions,
    },{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating permissions:", error);
    throw error;
  }
};

export const addPermission = async (roleId, permissions) => {
  try {
    const token = localStorage.getItem('token')
    const response = await httpRequest.post("/admin/decentralization/addPermissions", {
      roleId,
      permissions,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding permissions:", error);
    throw error;
  }
};



export const getAssignedPermissions = async (roleId) => {
  try {
    const token = localStorage.getItem('token')
    const response = await httpRequest.get(`/admin/decentralization/unassigned-permissions?roleId=${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching decentralization");
    throw error;
  }
};


export const getRoleAndPermissionsByUserId = async (userId) => {
  try {
      const token = localStorage.getItem('token');
      const response = await httpRequest.get('/admin/decentralization/getRoleAndPermissionsByUserId', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: { userId },
      });

      // Loại bỏ ký tự thừa trong permissions
      const result = response.data.result;
      if (result && result.permissions) {
          result.permissions = result.permissions.map((permission) =>
              permission.trim() // Loại bỏ ký tự xuống dòng hoặc khoảng trắng
          );
      }
      return result; // Trả về roleName và permissions đã xử lý
  } catch (error) {
      console.error('Error fetching role and permissions:', error);
      return null;
  }
};

