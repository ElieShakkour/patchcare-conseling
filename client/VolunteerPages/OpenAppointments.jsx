import React, { useState,useEffect } from "react";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import AppointmentService from "../src/services/AppointmentsService";
import { toast , ToastContainer} from "react-toastify";
import Chat from "./ChattingWithUser";

const OpenAppointments = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [slotNotAvailable, setSlotNotAvailable] = useState(false); 
  const [volunteerAppointments,setVolunteerAppointments] = useState([]);
  const [showChat,setShowChat] = useState(null);
  


  const fetchAppointments = async () => {
    try {
      const appointmentsData = await AppointmentService.getVolunteerAppointments(getLocalStorageUser().volunteer_id);
       setVolunteerAppointments(appointmentsData.data.appointments);
     } catch (error) {
      console.error("Error fetching chronic diseases:", error);
    }
  };

  useEffect(() => {
  

    fetchAppointments();
  }, []);



  const handleSubmit = async(e) => {
    e.preventDefault();

     const appointment = {
      appointment_date : appointmentDate,
      volunteer_id : getLocalStorageUser().volunteer_id,
      appointment_type : getLocalStorageUser().volunteer_type
    };

    const checkAppointmentResult = await AppointmentService.checkAppointment({ appointment }).catch(error => {
        toast.error("Error");
      });
      
      console.log(checkAppointmentResult.data.message);

      
      if (checkAppointmentResult.data.message === "Slot Available") {
        const result = await AppointmentService.openAppointment({ appointment }).catch(error => {
          toast.error("Error");
        });
        fetchAppointments();
        setSlotNotAvailable(false);
      } else {
        setSlotNotAvailable(true);
      }
      
 };

 function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
}
const handleDeleteAppointment = async (volunteerId, appointmentDate) => {
  const date = new Date(appointmentDate);
  date.setHours(date.getHours() + 2);
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

  const appointment = {
    volunteer_id: volunteerId,
    appointment_date: formattedDate,
  };





  try {
    await AppointmentService.deleteAppointment(appointment);
    const updatedAppointmentsData = await AppointmentService.getVolunteerAppointments(getLocalStorageUser().volunteer_id);
    setVolunteerAppointments(updatedAppointmentsData.data.appointments);
  } catch (error) {
 setVolunteerAppointments([]);
  }
};


const openChat = (volunteer) => {
  
  setShowChat(volunteer);

  
};
const closeChat = () => {
  
  setShowChat(null);

  
};


 return (
    <>


    <div className="card" style={{paddingTop:100}}>
      <div className="card-content">
        <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Open a new Slot</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="appointmentDate">Select Appointment Date and Time:</label>
            <input
              type="datetime-local"
              id="appointmentDate"
              name="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
          <button
              style={{
                backgroundColor: 'white',
                color: '#0D5D65',
                border: '2px solid #0D5D65',
                padding: '8px 16px',
                borderRadius: '20px',
                margin: '0 10px',
                transition: 'background-color 0.3s ease',
              }} className="hover-effect"   
              >Open Slot
            </button>
        </form>
        {slotNotAvailable && <div style={{ color: "red" }}>Slot is not available. You already have an appointment at this date and time.</div>}
   
       </div>
   
    </div>
    <div>

  <h2 style={{ color: '#0D5D65', fontSize: '43px', marginBottom: '20px' }}>Your Available Appointments</h2>
  <div className="appointment-list">
  {volunteerAppointments.map((appointment, index) => (
    <div key={index} className="appointment-card">
      <p className="appointment-date">
        <strong>Appointment Date:</strong> {formatDate(appointment.appointment_date)}
      </p>
      <button
              style={{
                backgroundColor: 'white',
                color: '#0D5D65',
                border: '2px solid #0D5D65',
                padding: '8px 16px',
                borderRadius: '20px',
                transition: 'background-color 0.3s ease',
              }}
              className="hover-effect"
              onClick={() => handleDeleteAppointment(appointment.volunteer_id, appointment.appointment_date)}
            >
              Delete
            </button>
    </div>
  ))}
</div>

</div>

    </>
  );
  
};

export default OpenAppointments;
