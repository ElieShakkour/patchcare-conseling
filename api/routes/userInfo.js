const express = require('express');
const authenticateToken = require('./middleware');
const{ getUserInfoController } = require('../controllers/userController');
const router = express.Router();
router.get("/user/userInfo",authenticateToken,getUserInfoController);
module.exports = router;