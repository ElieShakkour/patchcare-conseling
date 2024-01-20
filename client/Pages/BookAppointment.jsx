import React, { useEffect, useState } from "react";
import '../App.css';
import { toast } from "react-toastify";
import VolunteerService from "../src/services/VolunteerService";
import AppointmentService from "../src/services/AppointmentsService";
import ConditionsService from "../src/services/ConditionsService";
import {TextField,Select,MenuItem,FormControl,InputLabel,Input} from "@mui/material";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";

const BookAppointment = (props) => {
    
    const { volunteer_id, closeBookingForm } = props;

  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerType, setVolunteerType] = useState("");
  const [volunteerSpeciality, setVolunteerSpeciality] = useState("");
  const [volunteerProfile,setVolunteerProfile] = useState(null);
  const [moreInfo,setMoreInfo] = useState("");
  const [volunteerAppointments,setVolunteerAppointments] = useState([]);
  const [volunteerId,setVolunteerId] = useState(0);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
         const volunteerResult = await VolunteerService.getVolunteer(volunteer_id);
         const volunteerAppointmentsResult = await AppointmentService.getVolunteerAppointments(volunteer_id);
         setVolunteerAppointments(volunteerAppointmentsResult.data.appointments);
    setVolunteerName(volunteerResult.data.volunteer.volunteer_name);
    setVolunteerEmail(volunteerResult.data.volunteer.volunteer_email);
    setVolunteerType(volunteerResult.data.volunteer.volunteer_type)
    setVolunteerSpeciality(volunteerResult.data.volunteer.volunteer_speciality)
    setVolunteerProfile(volunteerResult.data.volunteer.url)
    setMoreInfo(volunteerResult.data.volunteer.volunteer_about);
    setVolunteerId(volunteerResult.data.volunteer.volunteer_id);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
fetchTherapist();
  
},[])


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }


  const handleBookAppointment = async (appointment_id, user_id) => {
  console.log(getLocalStorageUser(),"user")
    const appointment = {
        appointment_id: appointment_id,
        user_id: getLocalStorageUser().user_id,
    };
    console.log(appointment,"ljjlkj");
  
    try {
      await AppointmentService.bookappointment(appointment);
      console.log(volunteerId);
      const updatedAppointmentsData = await AppointmentService.getVolunteerAppointments(volunteerId);
      setVolunteerAppointments(updatedAppointmentsData.data.appointments);
    } catch (error) {
   setVolunteerAppointments([]);
    }
  };
  






  return (
    <div style={{ paddingTop: 50 }}>
      <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>Book an Appointment</h1>
      <div>
        <img
          src={volunteerProfile}
          alt={volunteerName}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
          }}
        />
        <div style={{ marginLeft: 20 }}>
          <p>Name: {volunteerName}</p>
          <p>Email: {volunteerEmail}</p>
          <p>Type: {volunteerType}</p>
          <p>Speciality: {volunteerSpeciality}</p>
          <p>More info about the volunteer: {moreInfo}</p>
        </div>
      </div>
      <button
        style={{
          backgroundColor: 'white',
          color: '#0D5D65',
          border: '2px solid #0D5D65',
          padding: '8px 16px',
          borderRadius: '20px',
          margin: '20px 0',
          transition: 'background-color 0.3s ease',
        }}
        onClick={closeBookingForm}
        className="hover-effect"
      >
        Back
      </button>
      {volunteerAppointments.length>0 ? (
        volunteerAppointments.map((appointment, index) => (
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
               onClick={() => handleBookAppointment(appointment.appointments_id, getLocalStorageUser().user_id)}
            >
              Book this appointment
            </button>
          </div>
        ))
      ) : (
        <h4 style={{ color: '#0D5D65'}}>No available appointments</h4>
      )}
    </div>
  );
  

}

export default BookAppointment;
