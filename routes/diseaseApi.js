const express = require('express');

const{ diseaseApiController } = require('../controllers/diseaseApiController');
const router = express.Router();
router.get("/diseaseApi",diseaseApiController);
module.exports = router;