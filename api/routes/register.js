const { imageUpload } = require('../controllers/registerController');
const{ registerController } = require('../controllers/registerController');
const{ checkUser } = require('../controllers/registerController')
const{ imageUploader } = require('../controllers/registerController')
const express = require('express');

const router = express.Router();
router.use(express.json({ limit: '100mb' }));
router.use(express.urlencoded({ extended: true, limit: '100mb' }));
router.post("/register", registerController);
router.post("/checkUser",  checkUser);
router.post("/register/imageUpload",imageUpload.single('image'), imageUploader);

module.exports = router;