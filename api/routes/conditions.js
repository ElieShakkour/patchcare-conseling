const express = require('express');

const{ mentalIllnessTypesController,chronicDiseaseTypesController,mentalIllnessTSpecialityController } = require('../controllers/conditionsController');
const router = express.Router();
router.get("/conditions/mentalillness",mentalIllnessTypesController);
router.get("/conditions/chronicdisease",chronicDiseaseTypesController);
router.get("/conditions/speciality",mentalIllnessTSpecialityController);
module.exports = router;