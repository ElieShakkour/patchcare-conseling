
import http from "../../http-common";
import { getToken } from "../../UTILS/localStorageUtils";
const insertChat = (chat) => {
    return http.post('/sendchat', chat, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
  const getChat = (chat) => {
    return http.post('/getchat', chat, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  const getChatsOfUser = (user_id) => {
    return http.get(`/getchatsofuser?user_id=${user_id} `, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
const ChatsService = {
    insertChat,
    getChat,
    getChatsOfUser
    
}


export default ChatsService;