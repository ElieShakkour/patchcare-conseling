const {query} = require('../database/db');

const openAppointement = async (data)=>{
    const {appointment_date,volunteer_id,appointment_type} = data;
    const sql = `Insert INTO appointments (appointment_date,volunteer_id,appointment_type) VALUES (?,?,?)`;
    try{
        const appointment = await query(sql,[appointment_date,volunteer_id,appointment_type]);
        if (!appointment) {
            return { status: 401, message: "cannot open slot!" }
        }

        return { status: 200, message: "Successful", appointment: appointment }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
    }

    const checkAppointement = async (appointment_date,volunteer_id)=>{
    const sql = `SELECT * FROM appointments where appointment_date = ? AND volunteer_id = ?`;
    try{
          const appointment = await query(sql,[appointment_date,volunteer_id]);
        
          if (appointment.length===0) {
            return { status: 200, message: "Slot Available" }
        }

        return { status: 402, message: "Slot not available" }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
    }

    const getAppointmentsOfVolunteer = async (volunteer_id)=>{
        const sql = `SELECT * FROM appointments where   volunteer_id = ? AND available = ?`;
        try{
              const appointments = await query(sql,[volunteer_id,1]);
                 if (appointments.length>0) {
                return { status: 200, message: "Appointments Found",appointments:appointments }
            }
    
            return { status: 404, message: "No appointments" }
        } catch (error) {
            return { status: 500, message: "internal error" }
        }
        }

        const deleteAppointment = async (volunteer_id,appointment_date)=>{
            const sql = `DELETE FROM appointments WHERE volunteer_id =? AND appointment_date =?;`;
            try{
                   const deleteResult = await query(sql,[volunteer_id,appointment_date]);
                 if (deleteResult) {
                    return { status: 200, message: "Appointement Deleted" }
                }

                
                return { status: 404, message: "No appointment" }
            } catch (error) {
                return { status: 500, message: "internal error" }
            }
            }
    
    

            const bookAppointment = async (appointments_id, user_id) => {
                const sql = `UPDATE appointments SET user_id = ?, available = 0 WHERE appointments_id = ?;`;
              
                try {
                    console.log(appointments_id,user_id,"l;")
                  const updateResult = await query(sql, [user_id, appointments_id]);
              
                  if (updateResult.affectedRows > 0) {
                    return { status: 200, message: "Appointment booked successfully" };
                  } else {
                    return { status: 401, message: "Error" };
                  }
                } catch (error) {
                  return { status: 500, message: "Internal error" };
                }
              };
              
              const getVolunteerBookedAppointments = async (volunteer_id)=>{
                const sql = `SELECT * FROM appointments where volunteer_id = ? AND available = ?`;
                try{
                      const appointments = await query(sql,[volunteer_id,0]);
                    
                      if (appointments.length===0) {
                        return { status: 200, message: "No booked Appointments",appointments : [] }
                    }
            
                    return { status: 200, message: "There are booked appointments", appointments : appointments }
                } catch (error) {
                    return { status: 500, message: "internal error" }
                }
                }
                const getUserBookedAppointments = async (user_id)=>{
                    const sql = `SELECT * FROM appointments where user_id = ? `;
                    try{
                          const appointments = await query(sql,[user_id]);
                        
                          if (appointments.length===0) {
                            return { status: 200, message: "No booked Appointments",appointments : [] }
                        }
                
                        return { status: 200, message: "There are booked appointments", appointments : appointments }
                    } catch (error) {
                        return { status: 500, message: "internal error" }
                    }
                    }  

    module.exports = {
        openAppointement,
        checkAppointement,
        getAppointmentsOfVolunteer,
        deleteAppointment,
        bookAppointment,
        getVolunteerBookedAppointments,
        getUserBookedAppointments
        
    }