const express = require('express');

const{ authenticateController,authenticateVolunteerController } = require('../controllers/authController');
const router = express.Router();
router.post("/authenticate",authenticateController);
router.post("/authenticatevolunteer",authenticateVolunteerController);
module.exports = router;