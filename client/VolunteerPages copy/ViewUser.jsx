import React, { useEffect, useState } from "react";
import '../App.css';
import { toast } from "react-toastify";
import VolunteerService from "../src/services/VolunteerService";

import {TextField,Select,MenuItem,FormControl,InputLabel,Input} from "@mui/material";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import MedicalRecordService from "../src/services/MedicalRecordService";
import UserService from "../src/services/UserService";
const ViewUser = (props) => {
    
    const { user_id, closeUserForm } = props;

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile,setUserProfile] = useState(null);
  const [bloodType,setBloodType] = useState("");
  const [chronicDisease,setChronicDisease] = useState("");
  const [mentalIllness,setMentalIllness] = useState("");
  const [moreInfo,setMoreInfo] = useState("");


  useEffect(() => {
    const fetchUser = async () => {
      try {
       
         const userResult = await UserService.getUser(user_id);
     
         const medicalRecordResult = await MedicalRecordService.getUserMedicalRecord(user_id);
         setUserName(userResult.data.user.fullName);
         setUserEmail(userResult.data.user.user_email);
         setUserProfile(userResult.data.user.url); // Set the userProfile state with the URL
         setBloodType(medicalRecordResult.data.medicalRecord.blood_type);
         setChronicDisease(medicalRecordResult.data.medicalRecord.chronic_disease);
         setMentalIllness(medicalRecordResult.data.medicalRecord.mental_illness);
         setMoreInfo(medicalRecordResult.data.medicalRecord.more_info);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    fetchUser();
  
},[user_id])





return (
    <div style={{ paddingTop: 50 }}>
      <h1 style={{ color: '#0D5D65', fontSize: '43px' }}>User Information</h1>
      <div>
        {userProfile && (
          <img
            src={userProfile}
            alt={userName}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
            }}></img>
          )
        }
        <div style={{ marginLeft: 20 }}>
          <p>Name: {userName}</p>
          <p>Email: {userEmail}</p>
          <p>Blood Type: {bloodType}</p>
          <p>Chronic Disease: {chronicDisease}</p>
          <p>Mental Illness: {mentalIllness}</p>
          <p>More Info: {moreInfo}</p>
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
        
        onClick={closeUserForm}
        className="hover-effect"
      >
        Back
      </button>
    </div>
    </div>
  );
  

}

export default ViewUser;
