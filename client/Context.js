import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { getLocalStorageUser } from './UTILS/localStorageUtils';
import UserService from "./services/UserService"
import VolunteerService from "./services/VolunteerService"
const SocketContext = createContext();

const socket = io('http://localhost:3001');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

useEffect(()=>{

  
  if(getLocalStorageUser().volunteer_id){ 
    setMe(getLocalStorageUser().volunteer_id);

    }else{
      setMe(getLocalStorageUser().user_id);

      }
    

})


  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        
        setStream(currentStream);
        if(myVideo.current){ 
        myVideo.current.srcObject = currentStream;
        }
      });

    socket.on('me', (id) => setMe(id));
 console.log("me",me);
    if(getLocalStorageUser().volunteer_id){ 
      socket.emit("add-user-toconference", getLocalStorageUser().volunteer_id);
      }else{
        socket.emit("add-user-toconference", getLocalStorageUser().user_id);
      }
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log("data",call)
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

const leaveCall = () => {
  setCallEnded(true);

  try {
   

    
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (userVideo.current && userVideo.current.srcObject) {
      const userStream = userVideo.current.srcObject;
      userStream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      profile,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
