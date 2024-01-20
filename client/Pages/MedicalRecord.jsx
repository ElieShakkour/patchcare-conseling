import React, { useEffect, useState } from "react";
import {Container,Typography,Grid,Paper,TextField,Button,Select,MenuItem,FormControl,InputLabel,Input} from "@mui/material";
import { getLocalStorageUser,getToken } from "../UTILS/localStorageUtils";
import { toast } from "react-toastify";
import ConditionsService from "../services/ConditionsService";
import MedicalRecordService from "../services/MedicalRecordService";
import  UserService  from "../services/UserService"
import { useNavigate } from 'react-router-dom';
const MedicalRecord = ({closeForm}) => {
  const [bloodType, setBloodType] = useState("");
  const [userChronicDisease, setUserChronicDisease] = useState("None");
  const [userMentalIllness, setUserMentalIllness] = useState("None");
  const [mentalIllness, setMentalIllness] = useState([]);
  const [chronicDisease, setChronicDisease] = useState([]);
  const [otherChronicDisease, setOtherChronicDisease] = useState("");
  const [otherMentalIllness, setOtherMentalIllness] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const chronicDiseaseData = await ConditionsService.getChronicDisease();
        const mentalIllnessData = await ConditionsService.getMentalIllness();
        setChronicDisease(chronicDiseaseData.data.chronicDiseaseTypes);
        setMentalIllness(mentalIllnessData.data.mentalIllnessTypes);
      } catch (error) {
        console.error("Error fetching chronic diseases:", error);
      }
    };

    fetchConditions();
  }, []);

  const bloodTypeOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
    { value: "O", label: "O" },
  ];

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const handleChronicDiseaseChange = (event) => {
    const selectedValue = event.target.value;
    setUserChronicDisease(selectedValue); 

    if (selectedValue === "Other") {
      setOtherChronicDisease(""); 
    }
  };

  const handleOtherChronicDiseaseChange = (event) => {
    setOtherChronicDisease(event.target.value);
  };

  const handleMentalIllnessChange = (event) => {
    const selectedValue = event.target.value;
    setUserMentalIllness(selectedValue);

    if (selectedValue === "Other") {
      setOtherMentalIllness("");
    }
  };

  const handleOtherMentalIllnessChange = (event) => {
    setOtherMentalIllness(event.target.value);
  };

  const handleMoreInfoChange = (event) => {
    setMoreInfo(event.target.value);
  };


  const handleSubmit = async () => {
    try{ 
      var id= getLocalStorageUser().insertId
    
      }catch(error){
        toast.error("You are not auhtorized");
      }
    if (
      bloodType &&
      ((userChronicDisease !== "Other" && userChronicDisease) ||
        (userChronicDisease === "Other" && otherChronicDisease)) &&
      ((userMentalIllness !== "Other" && userMentalIllness) ||
        (userMentalIllness === "Other" && otherMentalIllness))
    ) {
      
  
      const medicalRecord = {
        blood_type: bloodType,
        mental_illness: userMentalIllness === "Other" ? otherMentalIllness : userMentalIllness,
        chronic_disease: userChronicDisease === "Other" ? otherChronicDisease : userChronicDisease,
        more_info: moreInfo,
        user_id:id
      };
  
      try {
        const result = await MedicalRecordService.insertMedicalRecord(medicalRecord);
        closeForm();
        navigate('/');
   
      } catch (error) {
  
        console.error("Error while inserting medical record", error);
        toast.error("Error while inserting medical record");
      }
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };
  

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>
          Medical Record
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <label>Blood Type</label>
              <Select value={bloodType} onChange={handleBloodTypeChange}>
                {bloodTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <label>Mental Illness</label>
              <Select value={userMentalIllness} onChange={handleMentalIllnessChange}>
                <MenuItem value="None">None</MenuItem>
                {mentalIllness.map((disease) => (
                  <MenuItem key={disease.mentalIllnessId} value={disease.mentalIllnessName}>
                    {disease.mentalIllnessName}
                  </MenuItem>
                ))}
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {userMentalIllness === "Other" && (
                <Input
                  value={otherMentalIllness}
                  onChange={handleOtherMentalIllnessChange}
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <label>Chronic Disease</label>
              <Select value={userChronicDisease} onChange={handleChronicDiseaseChange}>
                {chronicDisease.map((disease) => (
                  <MenuItem key={disease.chronicDiseaseId} value={disease.chronicDiseaseName}>
                    {disease.chronicDiseaseName}
                  </MenuItem>
                ))}

              </Select>
              {userChronicDisease === "Other" && (
                <Input
                  value={otherChronicDisease}
                  onChange={handleOtherChronicDiseaseChange}
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <label>More info</label>
            <FormControl fullWidth>
              <TextField
                multiline
                rows={4}
                value={moreInfo}
                onChange={handleMoreInfoChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default MedicalRecord;
