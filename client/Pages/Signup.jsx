import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { setLocalStorageUser } from "../UTILS/localStorageUtils";
import "../App.css";
import { toast } from "react-toastify";
import unknown_image from "../UTILS/Images/anon.jpg";
import { MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBCardImage,MDBInput,MDBIcon,MDBCheckbox,} from "mdb-react-ui-kit";
import axios from "axios";
import MedicalRecord from "./MedicalRecord";
const Signup = ({onLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Do not specify");
  const [image, setImage] = useState(null);
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [medicalRecordInserted,setMedicalRecordInserted] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();

    if (fullName !== "" && email !== "" && password !== "" && dob !== "" && phone !== "" && gender !== "" ) {
      const user = {
        email: email,
        password: password,
        fullName: fullName,
        image: image,
        dob: dob,
        phone: phone,
        gender: gender,
      };
      console.log(user);
      const checkIfUserAvailable = await UserService.checkUser({ user });
      if (checkIfUserAvailable.data.message === "Email not found") {
        const result = await UserService.register({ user }).catch((error) => {
          alert(error.message);
          reset();
        });
      
        if (result?.data?.message === "Successful") {
          console.log(result)
          let authenticatedUser = result?.data?.user;
          authenticatedUser.token = result?.data?.token;
          setLocalStorageUser(authenticatedUser);
       
        
        const fileUploadApi = axios.create({
          baseURL: "http://localhost:3001/api/register",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        let upload = await fileUploadApi.post("/imageUpload", user);
        



   setShowMedicalRecord(true);  
      }

      } else {
        toast.error("Email Already Used");
        reset();
      }
    } else {
      toast.error("Please enter all your information");
      reset();
    }
  };


  const handleCloseMedicalRecord = () => {
    setMedicalRecordInserted(true);
    setShowMedicalRecord(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    console.log(image);
  };


  const reset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <MDBContainer className="mt-5">
    {showMedicalRecord ? (    <MedicalRecord closeForm={handleCloseMedicalRecord}  />  ):( 
  
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <img
                  src={image ? URL.createObjectURL(image) : unknown_image}
                  alt="Profile"
                  className="rounded-circle img-fluid"
                  style={{ width: "200px", height: "200px" }}
                />
                <input
                  type="file"
                  name="image"
                  id="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="custom-file-input mt-3"
                />
                
              </div>
              <form>
            <div style={{paddingLeft:20}}>
              <button
              className="btn btn-sm text-light fw-bold"
              style={{ backgroundColor: "#3498db", width: "200px", height: "40px",margin:10}}
            >
              <label htmlFor="file" className="custom-file-label">
                Upload Image
              </label>
            </button>
            </div>
                <MDBInput
                  label="Your Name"
                  size="lg"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

          <MDBInput wrapperClass="mb-4"label="Your Email" size="lg" id="form2" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput wrapperClass="mb-4" label="Date of Birth" size="lg" id="form3" type="date" value={dob} onChange={(e) => setDob(e.target.value)}
          />
          <MDBInput wrapperClass="mb-4" label="Phone" size="lg" id="form4" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          />
          <div className="mb-4 custom-select">
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Do not specify">Do not specify</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="gender" style={{ fontSize: "16px" }}>
              Gender
            </label>
          </div>
            <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
              </form>
              <button
  className="btn btn-primary w-100 mt-4"
  onClick={handleSignup}
>
  Signup
</button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )}
     
    </MDBContainer>
  );
};

export default Signup;
