
import http from "../src/http-commonmon";
import { getToken } from "../../UTILS/localStorageUtils";

const openAppointment = (appointment) => {
    return http.post('/appointments/openappointment', appointment, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
  const checkAppointment = (appointment) => {
    return http.get(`/appointments/checkappointment?appointment_date=${appointment.appointment.appointment_date}&volunteer_id=${appointment.appointment.volunteer_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
  const getVolunteerAppointments = (volunteer_id) => {
    return http.get(`/appointments/getVolunteerAppointments?volunteer_id=${volunteer_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  const deleteAppointment = (appointment) => {
    return http.post('/appointments/deleteappointment', appointment, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
  const bookappointment = (appointment) => {
    return http.post('/appointments/bookappointment', appointment, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  const getBookedVolunteerAppointments = (volunteer_id) => {
    return http.get(`/appointments/getVolunteerbookedappointments?volunteer_id=${volunteer_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    
    });
  }
  const getBookedUserAppointments = (user_id) => {
    return http.get(`/appointments/getuserbookedappointments?user_id=${user_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    
    });
  }
    const AppointmentService = {
    openAppointment,
    checkAppointment,
    getVolunteerAppointments,
    deleteAppointment,
    bookappointment,
    getBookedVolunteerAppointments,
    getBookedUserAppointments
}


export default AppointmentService;