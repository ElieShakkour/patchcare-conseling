const { imageUpload } = require('../controllers/registerController');
const{ volunteerRegisterController} = require('../controllers/volunteerRegisterController');
const{ checkVolunteer } = require('../controllers/volunteerRegisterController')
const{ imageUploader } = require('../controllers/volunteerRegisterController')
const{ cvUploader } = require('../controllers/volunteerRegisterController')
const {approveUser} = require('../controllers/volunteerRegisterController')
const express = require('express');

const router = express.Router();
router.use(express.json({ limit: '100mb' }));
router.use(express.urlencoded({ extended: true, limit: '100mb' }));

router.post("/volunteerregister", volunteerRegisterController);
router.post("/checkvolunteer",  checkVolunteer);
router.post("/registervolunteer/volunteerImageUpload",imageUpload.single('image'), imageUploader);
router.post("/registervolunteer/volunteerCvUpload",imageUpload.single('cv'), cvUploader);
router.get('/approve-volunteer', approveUser);

module.exports = router;