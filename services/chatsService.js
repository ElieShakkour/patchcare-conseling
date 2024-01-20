
const {query} = require('../database/db');
const insertChat = async (data)=>{
    const {sender_id,receiver_id,sender_type,chat_text} = data;
    const sql = `Insert INTO chats (sender_id,receiver_id,sender_type,chat_text) VALUES (?,?,?,?)`;
    try{
        console.log(sender_id,receiver_id,sender_type,chat_text)
        const message = await query(sql,[sender_id,receiver_id,sender_type,chat_text]);
        
        if (!message) {
            return { status: 401, message: "cannot insert these credentials!" }
        }
        return { status: 200, message: "Successful" }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "internal error" }
    }
    }

    const getChats = async (sender_id,receiver_id) => {
        const sql = `SELECT * FROM chats WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)`;
        try {
            const messages = await query(sql, [sender_id, receiver_id, receiver_id, sender_id]);

            if (!messages) {
                return { status: 401, message: "No chat messages found for these users." ,chats :[]};
            }
    
            return { status: 200, messages , chats : messages};
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Internal error" };
        }
    }
    const getChatsOfUser = async (user_id) => {
        const sql = `SELECT * FROM chats WHERE (sender_id = ? OR receiver_id = ?) ORDER BY chats_id DESC;`;
        try {
            const messages = await query(sql, [user_id,user_id]);

            if (!messages) {
                return { status: 401, message: "No chat messages found for these users." ,chats :[]};
            }
    
            return { status: 200, messages , chats : messages};
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Internal error" };
        }
      
    }
    module.exports = {
        insertChat,
        getChats,
        getChatsOfUser
    }
    

    