import React, { useEffect, useState } from "react";
import '../App.css';
import { toast } from "react-toastify";
import VolunteerService from "../src/services/VolunteerService";
import AppointmentService from "../src/services/AppointmentsService";
import ConditionsService from "../src/services/ConditionsService";
import {TextField, Select, MenuItem, FormControl, InputLabel, Input, Button } from "@mui/material";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
////import VideoPlayer from "../Components/VideoPlayer";
import VideoChat from "../Components/VideoChat";

const UserBookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [videoChatOpen, setVideoChatOpen] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const appointmentsResult = await AppointmentService.getBookedUserAppointments(getLocalStorageUser().user_id);
        console.log(appointmentsResult.data);
        const filteredAppointments = appointmentsResult.data.appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.appointment_date);
          const currentDate = new Date();
          return appointmentDate > currentDate;
        });
        setAppointments(filteredAppointments);
        console.log(appointments, "app");
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    fetchTherapist();
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const handleOpenVideoChat = (id) => {
    setVideoChatOpen(id);
  }

  const handleExitVideoChat = () => {
    setVideoChatOpen(null);
  }
  const today = new Date().toLocaleDateString();
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString();
    return appointmentDate === today;
  });
  
  return (
    <div style={{ paddingTop: 50 }}>
      {videoChatOpen ? (
        <div>
          <Button onClick={handleExitVideoChat} style={{ backgroundColor: 'white', color: '#0D5D65' }}>Back to Appointments</Button>
          <VideoChat id={videoChatOpen} />
        </div>
      ) : (
        <div>
          <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>Booked Appointments</h1>
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
                    onClick={() => handleOpenVideoChat(appointment.volunteer_id)}
                  >
                    Enter Video Conference
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
                  onClick={() => handleOpenVideoChat(appointment.volunteer_id)}
                >
                  Enter Video Conference
                </button>
              </div>
            ))
          ) : (
            <h4 style={{ color: '#0D5D65' }}>No booked appointments</h4>
          )}
        </div>
      )}
    </div>
  );
}

export default UserBookedAppointments;
