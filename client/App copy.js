import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes,useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from 'react-icons/fi';
import Login from './Pages/Signin';
import Signup from './Pages/Signup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Welcome from './Pages/Welcome'
import { getLocalStorageUser,getToken,setLocalStorageUser } from './UTILS/localStorageUtils';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Therapy from './Pages/Therapy';
import MedicalRecord from './Pages/MedicalRecord';
import VolunteerSignup from './Pages/VolunteerSignup';
import UserService from './src/services/UserService';
import FindTherapist from './Pages/FindTherapist';
import VolunteerService from './src/services/VolunteerService';
import OpenAppointments from './VolunteerPages/OpenAppointments';
import ChatPage from './Pages/ChatPage';
import BookedAppointments from './VolunteerPages/BookedAppointments';
import UserAppointments from './Pages/UserAppointments';
import VolunteerChatPage from './VolunteerPages/VolunteerChatPage';
import Footer from './Components/Footer';
import NavigationBar from './Components/NavigatioBar';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userImage,setUserImage] = useState();
  const [isVolunteerLoggedIn,setIsVolunteerLoggedIn] = useState(false);


const handleLogin = async () => {
  const result = await UserService.getUser(getLocalStorageUser().user_id);
  const user = result?.data?.user;

  if (user) {
    user.token = getToken();
    setLocalStorageUser(user);
    setUserImage(getLocalStorageUser().url);
    setIsLoggedIn(true);
  }
};
const handleVolunteerLogin = async () => {
  const result = await VolunteerService.getVolunteer(getLocalStorageUser().volunteer_id);
  const volunteer = result?.data?.volunteer;

  if (volunteer) {
    volunteer.token = getToken();
    setLocalStorageUser(volunteer);
    setUserImage(getLocalStorageUser().url);
    setIsVolunteerLoggedIn(true);
  }
};
  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsVolunteerLoggedIn(false);
  };
  return (
    <div className="App">
      <Router>
        <>
    
        <NavigationBar
        isLoggedIn={isLoggedIn}
        isVolunteerLoggedIn={isVolunteerLoggedIn}
        handleLogout={handleLogout}
        userImage={userImage}
      />
          <Routes>
            <Route path="/" element={<Welcome user={getLocalStorageUser()} isUserVolunteer={isVolunteerLoggedIn}/>} Component={Welcome} />
            <Route path="/signin" element={<Login onLogin={handleLogin} onVolunteerLogin={handleVolunteerLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="/therapy" element={<Therapy  />}  />
            <Route path="/medicalrecord" element={<MedicalRecord  />} />
            <Route path="/volunteersignup" element={<VolunteerSignup  />} />
            <Route path="/findTherapists" element={<FindTherapist  />} />
            <Route path="/openappointments" element={<OpenAppointments  />} />
            <Route path="/bookedappointments" element={<BookedAppointments />} />
            <Route path="/userbookedappointments" element={<UserAppointments />} />
            <Route path="/chatting" element={<ChatPage />} />
            <Route path="/chattingwithuser" element={<VolunteerChatPage />} />
       
          </Routes>
          <ToastContainer />
        </>
      </Router>
      
<Footer/>
    </div>
    
  );
  
  


}
export default App;
