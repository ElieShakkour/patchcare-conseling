const {openAppointement,checkAppointement,getAppointmentsOfVolunteer,deleteAppointment
,bookAppointment,getVolunteerBookedAppointments,getUserBookedAppointments
} = require('../services/appointmentsService');


const openAppointmentController = async(req,res)=>{
    const appointment = req.body.appointment;
    if(!appointment){
        return res.status(401).json({message: "missing data"});
    }
    const result = await openAppointement(appointment);
    if(result.status === 200){ 
      
        return res.status(200).json({message: result.message})
    }
}

const checkAppointmentController = async(req,res)=>{
    const {appointment_date,volunteer_id} = req.query;
    const result = await checkAppointement(appointment_date,volunteer_id);
     if(result.status === 200){ 
        return res.status(200).json({message: result.message})
    }else{
        return res.status(200).json({message: result.message})
    }
}

const getAppointmentsOfVolunteerController = async(req,res) =>{
    const {volunteer_id} = req.query;
    const result = await getAppointmentsOfVolunteer(volunteer_id);
    if(result.status === 200){ 
       return res.status(200).json({message: result.message,appointments: result.appointments})
    }
       return res.status(200).json({message: result.message,appointments: []})
   
}
const deleteAppointmentController = async(req,res) =>{
    const {volunteer_id,appointment_date} = req.body;
    const result = await deleteAppointment(volunteer_id,appointment_date);
    if(result.status === 200){ 
       return res.status(200).json({message: result.message})
   }
   
       return res.status(404).json({message: result.message})
   
}
const bookAppointmentController = async(req,res) =>{
    const {user_id,appointment_id} = req.body;
    console.log("booked",user_id)
    const result = await bookAppointment(appointment_id,user_id);

    if(result.status === 200){ 
       return res.status(200).json({message: result.message})
   }
   
       return res.status(401).json({message: result.message})
   
}

const getVolunteerBookedAppointmentsController = async(req,res) =>{
    const {volunteer_id} = req.query;
    
    const result = await getVolunteerBookedAppointments(volunteer_id);
    if(result.status === 200){ 
       return res.status(200).json({message: result.message,appointments : result.appointments})
   }
   
       return res.status(401).json({message: result.message,appointments : result.appointments})
   
}

const getUserBookedAppointmentsController = async(req,res) =>{
    const {user_id} = req.query;
    console.log(user_id)
    const result = await getUserBookedAppointments(user_id);
    if(result.status === 200){ 
       return res.status(200).json({message: result.message,appointments : result.appointments})
   }
   
       return res.status(401).json({message: result.message,appointments : result.appointments})
   
}

module.exports={
    openAppointmentController,
    checkAppointmentController,
    getAppointmentsOfVolunteerController,
    deleteAppointmentController,
    bookAppointmentController,
    getVolunteerBookedAppointmentsController,
    getUserBookedAppointmentsController
}