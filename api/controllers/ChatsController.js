const {insertChat,getChats,getChatsOfUser} = require('../services/chatsService');


const insertChatController = async(req,res)=>{
    const chat = req.body;
    console.log(chat);
    if(!chat){
        return res.status(401).json({message: "missing data"});
    }
    const result = await insertChat(chat);
   
    if(result.status === 200){ 
      
        return res.status(200).json({message: result.message})
    }
    return res.status(401).json({message: result.message})
}

const getChatController = async(req,res)=>{
    const {sender_id,receiver_id} = req.body;
    const result = await getChats(sender_id,receiver_id);
    if(result.status === 200){ 
      
        return res.status(200).json({message: result.message, chats : result.chats})
    }
    return res.status(401).json({message: result.message})
}

const getChatsOfUserController = async(req,res)=>{
    const {user_id} = req.query;
    console.log("user_id",user_id)
    const result = await getChatsOfUser(user_id);
    if(result.status === 200){ 
      
        return res.status(200).json({message: result.message, chats : result.chats})
    }
    return res.status(401).json({message: result.message,chats : []})
}
module.exports = {
    insertChatController,
    getChatController,
    getChatsOfUserController
  };
  