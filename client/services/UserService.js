import http from "../../http-common";
import { getToken } from "../../UTILS/localStorageUtils";
const authenticate = (user) => 
{
    return http.post(`/auth/authenticate`, user);
}



const register = (user) => 
{

    return http.post(`/register`, user);
}

const checkUser = (user) => 
{
    return http.post(`/checkUser`, user);
}
const getUser = (user_id) => {
  console.log("idd",user_id);
    return http.get(`/user/userInfo?user_id=${user_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
     
    });
  };
 
  const getImage = (imageKey) => 
  {
      return http.get(`/user/image/${imageKey}`);
  }

const UserService = {
    authenticate,
    register,
    checkUser,
    getUser,
    getImage
}


export default UserService;