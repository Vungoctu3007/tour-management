import { useState, useEffect } from "react";
import { getUsers } from "../../../services/userService";
function Profile() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetUsers = async () => {
      const result = await getUsers();
      setUsers(result);
    };
    fetUsers();
  },[]);
  
  return (
    <div>
      <h1>Profile</h1>
      <ul>
        {
          users.map((item,index)=>(
            <li key={index}>
              {item.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Profile;
