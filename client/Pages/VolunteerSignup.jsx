import React, { useEffect, useState } from "react";
import { RiUserFill, RiLockPasswordFill } from "react-icons/ri";
import { FaMale, FaPhone } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import UserService from "../services/UserService";
import fileUploadApi from "../services/UserService";
import { setLocalStorageUser } from "../UTILS/localStorageUtils";
import "../App.css";
import { toast } from "react-toastify";
import unknown_image from "../UTILS/Images/anon.jpg";
import { MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBCardImage,MDBInput,MDBIcon,MDBCheckbox,} from "mdb-react-ui-kit";
import aboutusImg from "../UTILS/Images/aboutUs.jpg";
import axios from "axios";
import VolunteerService from '../services/VolunteerService'
import AfterSignupMessage from "../Components/AfterSignupMessage"
import {TextField,Select,MenuItem,FormControl,InputLabel,Input} from "@mui/material";
import ConditionsService from "../services/ConditionsService";
const VolunteerSignup = () => {
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerType, setVolunteerType] = useState('Therapist');
  const [volunteerPassword, setVolunteerPassword] = useState('');
  const [volunteerProfile, setVolunteerProfile] = useState('');
  const [volunteerAbout, setVolunteerAbout] = useState('');
  const [volunteerPhoneNumber, setVolunteerPhoneNumber] = useState('');
  const [volunteerDob, setVolunteerDob] = useState('');
  const [image, setImage] = useState(null);
  const [cvFile, setCVFile] = useState(null);
  const [specialities,setSpecialities] = useState([]); 
  const [volunteerSpeciality,setVolunteerSpeciality] = useState("");
  const [otherSpeciality,setOtherSpeciality] =  useState("");
  const [showMessage,setShowMessage] = useState(false);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const mentalIllnessData = await ConditionsService.getSpeciality();
        const specialitySet = new Set();
        for (let i = 0; i < mentalIllnessData.data.speciality.length; i++) {
          specialitySet.add(mentalIllnessData.data.speciality[i].required_speciality);
        }
        const uniqueSpecialities = Array.from(specialitySet);
       
        setSpecialities(uniqueSpecialities);
      } catch (error) {
        console.error("Error fetching chronic diseases:", error);
      }
    };

    fetchConditions();
  }, []);


  const registerVolunteer = async (e) => {
    e.preventDefault();
 
    if (
      volunteerName !== "" &&
      volunteerEmail !== "" &&
      volunteerPassword !== "" &&
      volunteerDob !== "" &&
      volunteerPhoneNumber !== "" &&
      volunteerType !== ""
      
    ) {

      if(volunteerSpeciality==="Other"&&otherSpeciality===""){
        toast.error("Enter your Speciality please");
      }else{
        const volunteerData = {
          volunteer_name: volunteerName,
          volunteer_email: volunteerEmail,
          volunteer_type: volunteerType,
          volunteer_password: volunteerPassword,
          volunteer_profile: volunteerProfile,
          volunteer_about: volunteerAbout,
          volunteer_phonenumber: volunteerPhoneNumber,
          volunteer_Dob: volunteerDob,
          volunteer_CV: cvFile,
          volunteer_speciality: volunteerSpeciality === "Other" ? otherSpeciality : volunteerSpeciality,
        };
    

      const checkIfEmailAvailable = await VolunteerService.checkVolunteer({
        volunteerData,
      });
      if (checkIfEmailAvailable.data.message === "Email not found") {
        const result = await VolunteerService.register({ volunteerData }).catch(
          (error) => {
            alert(error.message);
          }
        );
        if (result?.data?.message === "Successful") {
        const ImageUploadApi = axios.create({
          baseURL: "http://localhost:3001/api/registervolunteer",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        let formData = new FormData();
        formData.append("image", volunteerProfile);
        formData.append("email", volunteerEmail);
        let upload = await ImageUploadApi.post("/volunteerImageUpload", formData);
        const fileUploadApi = axios.create({
          baseURL: "http://localhost:3001/api/registervolunteer",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        let formData2 = new FormData();
        formData2.append("cv", cvFile); 
        formData2.append("email", volunteerEmail);
        let uploadFile = await fileUploadApi.post("/volunteerCvUpload", formData2);   
        
        setShowMessage(true)

       } else {
        toast.error("Unable to enter your info");
      }
    } else {
      toast.error("Email Already Used");
    }
    }
  }else {
    toast.error("Enter all the fields");
  }
  
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVolunteerProfile(file);
    }
    console.log(file);
  };
  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCVFile(file);
    }
  };

  const handleSpecialityChange = (event) => {
    const selectedValue = event.target.value;
    setVolunteerSpeciality(selectedValue);

  };



  return (
    showMessage ? (
      <AfterSignupMessage />
    ) : (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image">
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Join our team</h2>
          <div style={{ textAlign: "center" }}>
            <div className="mb-4">
              {volunteerProfile ? (
                <img id="output" src={URL.createObjectURL(volunteerProfile)} alt="Profile" style={{ width: "200px", height: "200px", borderRadius: "50%", }}
                />
              ) : (
                <img id="output" src={unknown_image} alt="Unknown" style={{ width: "200px", height: "200px", borderRadius: "50%", }}
                />
              )}

<input type="file" name="image" id="file" accept="image/*" onChange={handleImageUpload} className="custom-file-input"
              />

            </div>
            <button
              className="btn btn-sm text-light fw-bold"
              style={{ backgroundColor: "#3498db", width: "200px", height: "30px" }}
            >
              <label htmlFor="file" className="custom-file-label">
                Upload Image
              </label>
            </button>
          </div>
          <MDBInput wrapperClass="mb-4" label="Your Name"  size="lg"  id="form1" type="text" value={volunteerName}  onChange={(e) => setVolunteerName(e.target.value)}
          />
          <MDBInput wrapperClass="mb-4"label="Your Email" size="lg" id="form2" type="email" value={volunteerEmail} onChange={(e) => setVolunteerEmail(e.target.value)}
          />
          <MDBInput wrapperClass="mb-4" label="Date of Birth" size="lg" id="form3" type="date" value={volunteerDob} onChange={(e) => setVolunteerDob(e.target.value)}
          />
          <MDBInput wrapperClass="mb-4" label="Phone" size="lg" id="form4" type="tel" value={volunteerPhoneNumber} onChange={(e) => setVolunteerPhoneNumber(e.target.value)}
          />
          <div className="mb-4 custom-select">
            <select id="type" value={volunteerType} onChange={(e) => setVolunteerType(e.target.value)}>
              <option value="Therapist">Therapist</option>
              <option value="Doctor">Doctor</option>
            </select>
            <label htmlFor="type" style={{ fontSize: "16px" }}>
              What do to you want to be?  
            </label>
          </div>
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form6"
            type="password"
            value={volunteerPassword}
            onChange={(e) => setVolunteerPassword(e.target.value)}
          />
        <div className="mb-4">
  <label htmlFor="cv" className="form-label">
    Upload CV (Please make it detailed, your acceptance is based on your cv and references)
  </label>
  <input
    type="file"
    name="cv"
    id="cv"
    accept=".pdf, .doc, .docx" 
    onChange={handleCVUpload}
    className="form-control"
  />
    <FormControl fullWidth>
   <label>Speciality(This will helps patients find you)</label>
   <Select value={volunteerSpeciality} onChange={handleSpecialityChange}>
  {specialities.map((speciality) => (
    <MenuItem key={speciality} value={speciality}>
      {speciality}
    </MenuItem>
))}
</Select>
{volunteerSpeciality === "Other" && (
                <Input
                  value={otherSpeciality}
                  onChange={(e) => setOtherSpeciality(e.target.value)}
                  placeholder="Please provide your speciality"
                />
              )}

</FormControl>
</div>


          <label>About you (If you'd like patients to know something about you)</label>
    <FormControl fullWidth>
      <TextField
        multiline
        rows={2}
        value={volunteerAbout}
        onChange={(e) => setVolunteerAbout(e.target.value)}
  />
</FormControl>

          <button
            className="btn btn-sm text-light fw-bold"
            style={{ backgroundColor: "#3498db", width: "200px", height: "30px", marginLeft: "70px" }}
            onClick={registerVolunteer}
          >
            Request
          </button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    )
  );

};

export default VolunteerSignup;
