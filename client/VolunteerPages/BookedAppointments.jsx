import React, { useEffect, useState } from "react";
import '../App.css';
import { toast } from "react-toastify";
import VolunteerService from "../src/services/VolunteerService";
import AppointmentService from "../src/services/AppointmentsService";
import ConditionsService from "../src/services/ConditionsService";
import { TextField, Select, MenuItem, FormControl, InputLabel, Input } from "@mui/material";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import ViewUser from "./ViewUser";
import Chat from "./ChattingWithUser";
import VideoChat from "../Components/VideoChat";

const BookedAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(null);
  const [showChat, setShowChat] = useState(null);
  const [startVideoCall, setStartVideoCall] = useState(false);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const appointmentsResult = await AppointmentService.getBookedVolunteerAppointments(getLocalStorageUser().volunteer_id);
        console.log(appointmentsResult.data);
        
        const filteredAppointments = appointmentsResult.data.appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.appointment_date);
          const currentDate = new Date();
          return appointmentDate > currentDate;
        });

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    fetchTherapist();

  }, []);

  const openUserFormView = (user_id) => {
    setOpenUserForm(user_id);
  };

  const closeUserForm = () => {
    setOpenUserForm(null);
  };

  const openChat = (user) => {
    setShowChat(user);
  };

  const closeChat = () => {
    setShowChat(null);
  };

  const openMeeting = (user_id) => {
    setStartVideoCall(user_id);
  };
  const closeMeeting = () => {
    setStartVideoCall(null);
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const today = new Date().toLocaleDateString();
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString();
    return appointmentDate === today;
  });

  return (
    <div style={{ paddingTop: 50 }}>
      {startVideoCall ? (
        <VideoChat id={startVideoCall} />
      ) : (
        <div>
          <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>Booked Appointments</h1>
          {openUserForm ? (
            <ViewUser user_id={openUserForm} closeUserForm={closeUserForm} />
          ) : showChat ? (
            <Chat user={showChat} closeChat={closeChat} withBack={true} />
          ) : (
            <div>
              {todayAppointments.length > 0 ? (
                <div>
                  <h2 style={{ color: '#0D5D65', fontSize: '24px' }}>Today's Appointments</h2>
                  {todayAppointments.map((appointment, index) => (
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
                        onClick={() => openUserFormView(appointment.user_id)}
                      >
                        View User
                      </button>
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
                        onClick={() => openChat(appointment.user_id)}
                      >
                        Send Message
                      </button>
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
                        onClick={() => openMeeting(appointment.user_id)}
                      >
                        Start Meeting
                      </button>
                    
                    </div>
                  ))}
                </div>
              ) : (
                <h4 style={{ color: '#0D5D65' }}>No appointments scheduled for today</h4>
              )}
  
              <h2 style={{ color: '#0D5D65', fontSize: '24px' }}>All Future Appointments</h2>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
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
                      onClick={() => openUserFormView(appointment.user_id)}
                    >
                      View User
                    </button>
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
                      onClick={() => openChat(appointment.user_id)}
                    >
                      Send Message
                    </button>
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
                      onClick={() => openMeeting(appointment.user_id)}
                    >
                      Start Meeting
                    </button>
                
                  </div>
                ))
              ) : (
                <h4 style={{ color: '#0D5D65' }}>No booked appointments</h4>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  
}

export default BookedAppointments;
