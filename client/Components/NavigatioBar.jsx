import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../UTILS/Images/logo.png';
import { FiEdit } from 'react-icons/fi';
const NavigationBar = ({ isLoggedIn, isVolunteerLoggedIn, handleLogout, userImage }) => {

  const renderUserNav = () => (
    <nav className="navbar navbar-light bg-light">
           <a className="navbar-brand" href="/">
             <img src={logo} alt="Logo" width="400" height="40" />
           </a>
           <div className="d-flex">
           <div className="dropdown">
               <button
                 className="btn btn-link text-light ml-3"
                 id="navbarDropdown"
                 data-bs-toggle="dropdown"
               >
                 <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>Appointments</span>
               </button>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
               <li>
                   <Link to="/userbookedappointments" className="dropdown-item">
                     My Appointments
                   </Link>
                 </li>
               </ul>
             </div>
           <div className="dropdown">
               <button
                 className="btn btn-link text-light ml-3"
                 id="navbarDropdown"
                 data-bs-toggle="dropdown"
               >
                 <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>Chat</span>
               </button>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                 <li>
                   <Link className="dropdown-item"  to="/chatting">
                     My Chats
                   </Link>
                 </li>
               </ul>
             </div>
             <div className="dropdown">
               <button
                 className="btn btn-link text-light ml-3"
                 id="navbarDropdown"
                 data-bs-toggle="dropdown"
               >
                
                 <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>Therapy</span>
               </button>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                
                 <li>
                   <Link className="dropdown-item"  to="/therapy">
                     Our Mission in Therapy 
                   </Link>
                 </li>
                 <li>
                   <Link to="/findTherapists" className="dropdown-item">
                     Find a Therapist
                   </Link>
                 </li>
                 

               </ul>
             </div>
             <div className="dropdown">
               <button
                 className="btn btn-link text-light ml-3"
                 id="navbarDropdown"
                 data-bs-toggle="dropdown"
               >
                 <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>Menu</span>
               </button>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                 <li>
                   <Link className="dropdown-item" onClick={handleLogout} to="/">
                     Sign out
                   </Link>
                 </li>
                 <li>
                   <Link to="/" className="dropdown-item">
                     Welcome Page
                   </Link>
                 </li>
 
               </ul>
             </div>
             <div className="ml-3"> 
      <img src={userImage} style={{height:50,width:50,borderRadius: "50%" ,objectFit: "cover"}}></img>
             </div>
           </div>
         </nav>
  );

  const renderVolunteerNav = () => (
    <nav className="navbar navbar-light bg-light">
    <a className="navbar-brand" href="/">
      <img src={logo} alt="Logo" width="400" height="40" />
    </a>
    <div className="d-flex">
    <div className="dropdown">
        <button
          className="btn btn-link text-light ml-3"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
        >
          <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>Chats</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item"  to="/chattingwithuser">
              My Chats
            </Link>
          </li>

        </ul>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-link text-light ml-3"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
        >
          <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>My Schedule</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item"  to="/openappointments">
              Available Appointments 
            </Link>
          </li>
          <li>
            <Link className="dropdown-item"  to="/bookedappointments">
              View Booked Appointments 
            </Link>
          </li>
        </ul>
      </div>
  
  
      <div className="dropdown">
        <button
          className="btn btn-link text-light ml-3"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
        >
          <FiEdit className="dropdown-icon" /> <span className="dropdown-text" style={{color:"black"}}>Menu</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item" onClick={handleLogout} to="/">
              Sign out
            </Link>
          </li>
          <li>
            <Link to="/" className="dropdown-item">
              Welcome Page
            </Link>
          </li>

        </ul>
      </div>
      <div className="ml-3"> 
<img src={userImage} style={{height:50,width:50,borderRadius: "50%" ,objectFit: "cover"}}></img>
      </div>
    </div>
  </nav>
  );

  const renderDefaultNav = () => (
    <nav className="navbar navbar-light bg-light">
    <a className="navbar-brand" href="/">
      <img src={logo} alt="Logo" width="400" height="40" />
    </a>

    <div className="d-flex" style={{ marginRight: 200 }}>
      <div className="dropdown">
        
        <button
          className="btn btn-link text-light ml-3"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
        >
      
          <FiEdit className="dropdown-icon" /> 
          <span className="dropdown-text" style={{color:"black"}}>Menu</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item" to="/signin">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="dropdown-item">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/" className="dropdown-item">
              Welcome Page
            </Link>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-link text-light ml-3"
          id="navbarDropdown2"
          data-bs-toggle="dropdown"
        >
          <FiEdit className="dropdown-icon" />
          <span className="dropdown-text" style={{color:"black"}}>Join our team</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
          <li>
            <Link className="dropdown-item"  to="/volunteersignup">
              Volunteer to become a therapist  
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );

  return (
    <>
      {isLoggedIn && !isVolunteerLoggedIn && renderUserNav()}
      {isVolunteerLoggedIn && renderVolunteerNav()}
      {!isLoggedIn && !isVolunteerLoggedIn && renderDefaultNav()}
    </>
  );
};

export default NavigationBar;
