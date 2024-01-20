const express = require('express');
const authenticateToken = require('./middleware');
const{ insertChatController,getChatController ,getChatsOfUserController} = require('../controllers/ChatsController');
const router = express.Router();
router.post("/sendchat",authenticateToken,insertChatController);
router.post("/getchat",authenticateToken,getChatController);
router.get("/getchatsofuser",authenticateToken,getChatsOfUserController);
module.exports = router;