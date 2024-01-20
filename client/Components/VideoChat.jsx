import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import { Container, Typography } from "@mui/material";
import VideoPlayer from './VideoPlayer';
import Sidebar from './SideBar';
import Notifications from './Notifications';
import {  AppBar } from '@mui/material';
import { SocketContext } from '../Context';
import { ContextProvider } from '../Context';
import UserService from '../services/UserService';
import VolunteerService from '../services/VolunteerService';

const VideoChat = ({id}) => {
 
const [name,setName]=useState("");
const [profile,setProfile] = useState("");
const [otherUserName,setOtherUserName] = useState("");
const [isVolunteer,setIsVolunteer] = useState(false);
useEffect(()=>{

  let fetchUser = async(type)=>{
    if(type=="user"){
      let user = await UserService.getUser(getLocalStorageUser().user_id)
      console.log(user.data.user);
     setProfile(user.data.user.url);
     setName(user.data.user.fullName)
     console.log("otherId",id);
     let other = await VolunteerService.getVolunteer(id);
     console.log("other",other);
     setOtherUserName(other.data.volunteer.volunteer_name);
    
    }else{
      let volunteerRes = (await VolunteerService.getVolunteer(getLocalStorageUser().volunteer_id)).data.volunteer;
      setProfile(volunteerRes.url);
      setName(volunteerRes.volunteer_name)
      let other = await UserService.getUser(id);
      setOtherUserName(other.data.user.fullName);
      
    }
  
     }
  if(getLocalStorageUser().volunteer_id){ 
    setIsVolunteer(true);
    fetchUser("volunteer");
    }else{
      fetchUser("user");
      
    }

console.log(profile,"proflie");
    
console.log(name,"name");
    
    
})

  return (
   <div> 
    <ContextProvider>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer name={name} profile={profile} otherUserName={otherUserName} />
      <Sidebar id={id} isVolunteer={isVolunteer}>
        <Notifications />
      </Sidebar>
      </ContextProvider>
      </div>
  );
};

export default VideoChat;
