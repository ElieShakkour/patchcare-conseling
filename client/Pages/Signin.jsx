import React, {useEffect, useState} from "react"
import  {RiUserFill, RiLockPasswordFill} from 'react-icons/ri';
import UserService from "../src/services/UserService";
import { setLocalStorageUser} from "../UTILS/localStorageUtils";
import { toast } from "react-toastify";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import '../App.css';
import { 
  Redirect, 
} from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import VolunteerService from "../src/services/VolunteerService";
const Login = ({onLogin,onVolunteerLogin})=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType,setLoginType] = useState('User')
    const navigate = useNavigate();


    const handleLogin = async(e) =>{
      e.preventDefault();
        if(email !== '' && password !== ''){
            const user = {
                email: email,
                password
            }
            let result;
        if(loginType==="User"){


             result = await UserService.authenticate({user}).catch(error=>{
                toast.error("WRONG USERNAME/PASSWORD");
                reset();
            });
           
           
          }else{
             result = await VolunteerService.authenticateVolunteer({user}).catch(error=>{
              toast.error("WRONG USERNAME/PASSWORD");
              reset();
          });
        }
            if(result?.data?.message === "Successful"){
                let authenticatedUser = result?.data?.user;
                authenticatedUser.token = result?.data?.token;
                setLocalStorageUser(authenticatedUser);


                if(loginType==="User"){ 
                onLogin();
                }else{
                  onVolunteerLogin();
                }
                navigate('/');
          
            }
        }
    
    
    }
    const reset = () => {
        setEmail("");
        setPassword("");
    }

    return (
      <div className="login-container">
        <form>
        <div className="login-card">
          <h2>Signin</h2>
          <hr className="dotted-line" />
          <div className="form-group">
            <RiUserFill className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <RiLockPasswordFill className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Choose Login Type:</label>
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
          <button
            className="btn btn-sm text-light fw-bold"
            style={{ backgroundColor: "#3498db" }}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        </form>
      </div>
    );
    
};

export default Login;