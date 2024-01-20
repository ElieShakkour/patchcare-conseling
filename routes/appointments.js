
const express = require('express');
const authenticateToken = require('./middleware');
const{ openAppointmentController,checkAppointmentController,getAppointmentsOfVolunteerController,deleteAppointmentController
,bookAppointmentController,getVolunteerBookedAppointmentsController,getUserBookedAppointmentsController } = require('../controllers/appointmentsController');



const router = express.Router();
router.post("/appointments/openappointment",authenticateToken, openAppointmentController);
router.get("/appointments/checkappointment",authenticateToken, checkAppointmentController);
router.get("/appointments/getVolunteerAppointments",authenticateToken, getAppointmentsOfVolunteerController);
router.post("/appointments/deleteappointment",authenticateToken, deleteAppointmentController);
router.post("/appointments/bookappointment",authenticateToken, bookAppointmentController);
router.get("/appointments/getVolunteerbookedappointments",authenticateToken, getVolunteerBookedAppointmentsController);
router.get("/appointments/getuserbookedappointments",authenticateToken, getUserBookedAppointmentsController);
module.exports = router;

