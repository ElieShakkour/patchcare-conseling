import React, { useEffect, useState } from "react";
import '../App.css';
import { toast } from "react-toastify";
import VolunteerService from "../services/VolunteerService";
import ConditionsService from "../services/ConditionsService";
import {TextField,Select,MenuItem,FormControl,InputLabel,Input} from "@mui/material";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import BookAppointment from "./BookAppointment";
import Chatting from "./Chatting"
const FindTherapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [specialities, setSpecialities] = useState([]);
 
  const [selectedSpeciality,setSelectedSpeciality] = useState("");
  const [recommendedTherapists,setRecommendedTherapists] = useState([]);
  const [bookingFormVolunteerId, setBookingFormVolunteerId] = useState(null);
  const [showChat,setShowChat] = useState(null);
  useEffect(() => {
    const fetchTherapists = async () => {
      try {

       const therapistsResult = await VolunteerService.getTherapists();
       setTherapists(therapistsResult.data.therapists);
       console.log(therapistsResult.data.therapists);
       const mentalIllnessData = await ConditionsService.getSpeciality();
       const specialitySet = new Set();
       for (let i = 0; i < mentalIllnessData.data.speciality.length; i++) {
         specialitySet.add(mentalIllnessData.data.speciality[i].required_speciality);
       }
       const uniqueSpecialities = Array.from(specialitySet);
      
       setSpecialities(uniqueSpecialities);
     
       const recommendedTherapistsData = await VolunteerService.getRecommendedTherapists(getLocalStorageUser().mental_illness);
      setRecommendedTherapists(recommendedTherapistsData.data.therapists);
console.log(recommendedTherapistsData,"32111111111");
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
fetchTherapists();
   console.log(getLocalStorageUser())
},[])

const handleSpecialityChange = (event) => {
  const selectedValue = event.target.value;
  setSelectedSpeciality(selectedValue);

};
const filterVolunteers = async (event) => {
  try {
    if (selectedSpeciality === "All Specialities") {
      const therapistsResult = await VolunteerService.getTherapists();
      setTherapists(therapistsResult.data.therapists);
    } else {
      const filteredVolunteersResponse = await VolunteerService.getTherapistsBySpeciality(selectedSpeciality);
      const filteredVolunteers = filteredVolunteersResponse.data.therapists;
      setTherapists(filteredVolunteers);
    }
  } catch (error) {
    setTherapists([]);
  }
};

const openBookingForm = (volunteerId) => {
  
  setBookingFormVolunteerId(volunteerId);
  
};

const closeBookingForm = () => {

  setBookingFormVolunteerId(null);
  
};
const openChat = (volunteer) => {
  
  setShowChat(volunteer);

  
};
const closeChat = () => {
  
  setShowChat(null);

  
};


return (
  <div style={{ paddingTop: 50 }}>
  {bookingFormVolunteerId ? (
  
    <BookAppointment volunteer_id={bookingFormVolunteerId}  closeBookingForm ={closeBookingForm} />
  ) : showChat ? (
    <Chatting volunteer={showChat} closeChat={closeChat} withBack={true} />
  ) : (
<> 

       <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>Recommended therapists </h1>

     {recommendedTherapists.length > 0 ? (
      recommendedTherapists.map((therapist) => (
        
        <div
          key={therapist.volunteer_id}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <img
            src={therapist.url}
            alt={therapist.volunteer_name}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
            }}
          />
          <div style={{ marginLeft: 20 }}>
            <p>Name: {therapist.volunteer_name}</p>
            <p>Specialty: {therapist.volunteer_speciality}</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button
              style={{
                backgroundColor: 'white',
                color: '#0D5D65',
                border: '2px solid #0D5D65',
                padding: '8px 16px',
                borderRadius: '20px',
                margin: '0 10px',
                transition: 'background-color 0.3s ease',
              }}
              className="hover-effect"
              onClick={() => openBookingForm(therapist.volunteer_id)}
              
            >
              Book Appointment
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
              onClick={() => openChat(therapist)}
          

            >
              Send Message
            </button>
          </div>
        </div>
      ))
    ) : (
      <p style={{ marginTop: 20, color: '#0D5D65', fontSize: '20px' }}>No Recommended therapists found.</p>
    )}
    <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>Find a Therapist</h1>
    <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
      <FormControl style={{ marginTop: 15 }}>
        <label>Filter by speciality</label>
        <Select value={selectedSpeciality} onChange={handleSpecialityChange}>
        <MenuItem value="All Specialities">All Specialities</MenuItem>
       
          {specialities.map((speciality) => (
            <MenuItem key={speciality} value={speciality}>
              {speciality}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button
        style={{
          backgroundColor: 'white',
          color: '#0D5D65',
          border: '2px solid #0D5D65',
          padding: '8px 16px',
          borderRadius: '20px',
          transition: 'background-color 0.3s ease',
          marginLeft: '20px',
          marginTop: 30,
        }}
        onClick={filterVolunteers}
        className="hover-effect"
      >
        Filter
      </button>
    </div>
    {therapists.length > 0 ? (
      therapists.map((therapist) => (
        <div
          key={therapist.volunteer_id}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <img
            src={therapist.url}
            alt={therapist.volunteer_name}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
            }}
          />
          <div style={{ marginLeft: 20 }}>
            <p>Name: {therapist.volunteer_name}</p>
            <p>Specialty: {therapist.volunteer_speciality}</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button
              style={{
                backgroundColor: 'white',
                color: '#0D5D65',
                border: '2px solid #0D5D65',
                padding: '8px 16px',
                borderRadius: '20px',
                margin: '0 10px',
                transition: 'background-color 0.3s ease',
              }}
              className="hover-effect"
              onClick={() => openBookingForm(therapist.volunteer_id)}
              
            >
              Book Appointment
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
              onClick={() => openChat(therapist)}
          
            >
              Send Message
            </button>
            
          </div>
        </div>
      ))
    ) : (
      <p style={{ marginTop: 20, color: '#0D5D65', fontSize: '20px' }}>No therapists found.</p>
    )}
</>
    )}
    </div>
);

}

export default FindTherapist;
