   
   import React, { useEffect, useRef, useState } from 'react';
   import io from 'socket.io-client';
   import Peer from 'simple-peer';
   import { getLocalStorageUser } from "../UTILS/localStorageUtils";
   
   const VideoChat = (volunteer_id) => {
     const socket = useRef();
     const myPeer = useRef();
     const videoGrid = useRef();
     const peers = useRef({});
     const[ROOM_ID,setROOM_ID] = useState();
     const [callStarted, setCallStarted] = useState(false);
     const myVideo = useRef(); 
     const [videoStreams, setVideoStreams] = useState([]);
 
   useEffect(()=>{
    console.log(volunteer_id)
     setROOM_ID(volunteer_id.volunteer_id)
   })
   

   useEffect(() => {
    videoGrid.current = document.getElementById('video-grid');
  }, []);

  useEffect(() => {
    if (ROOM_ID) {
      socket.current = io("http://127.0.0.1:3001");
      socket.current.emit("add-user-toconference", getLocalStorageUser().user_id);

      myPeer.current = new Peer({
        initiator: window.location.hash === '#init',
        trickle: false,
      });

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        const myVideoElement = document.createElement('video');
        myVideoElement.muted = true;
        addVideoStream(myVideoElement, stream);
        
        myPeer.current.on('call', (call) => {
          call.answer(stream);
          const newPeerVideo = document.createElement('video');
          call.on('stream', (userVideoStream) => {
            addVideoStream(newPeerVideo, userVideoStream);
          });
        });

        socket.current.on('user-connected', (userId) => {
          connectToNewUser(userId, stream);
        });
      });

      socket.current.emit('join-room', ROOM_ID, volunteer_id);

      socket.current.on('user-disconnected', (userId) => {
        if (peers.current[userId]) {
          peers.current[userId].close();
          removeVideoStream(userId);
        }
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [ROOM_ID]);

  function connectToNewUser(userId, stream) {
    const call = myPeer.current.call(userId, stream);
    const newPeerVideo = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(newPeerVideo, userVideoStream);
    });
    call.on('close', () => {
      newPeerVideo.remove();
      removeVideoStream(userId);
    });
    peers.current[userId] = call;
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    setVideoStreams((prevStreams) => [...prevStreams, { id: stream.id, video }]);
    videoGrid.current.append(video);
  }

  function removeVideoStream(userId) {
    setVideoStreams((prevStreams) => prevStreams.filter((stream) => stream.id !== userId));
  }


  const startCall = () => {
    const userIdToCall = volunteer_id.volunteer_id;
    if (ROOM_ID && myPeer.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        const myVideoElement = document.createElement('video');
        myVideoElement.muted = true;
        addVideoStream(myVideoElement, stream);
        const call = myPeer.current.call(userIdToCall, stream);
        const newPeerVideo = document.createElement('video');

        call.on('stream', (userVideoStream) => {
          addVideoStream(newPeerVideo, userVideoStream);
        });

        call.on('close', () => {
          newPeerVideo.remove();
          removeVideoStream(userIdToCall);
        });

        peers.current[userIdToCall] = call;
      }).catch((error) => {
        console.error('Error accessing media devices:', error);
      });
    }
  };

  return (
    <div>
      <div id="video-grid">
        {/* Rendering video streams */}
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
    
   };
   
   export default VideoChat;
   
   
   
   // import { Container, Typography } from "@mui/material";
    // import React from "react";
    // import VideoPlayer from "../Components/VideoPlayer";
    // import { ContextProvider, SocketContext } from "../Context"


    // const VideoChat = () => {
    // return (
    //     <>
    //      <ContextProvider>
     
    //   <SocketContext.Consumer>
    //     {(context) => (
    //       <VideoPlayer
    //         myVideo={context.myVideo}
    //         name={context.name}
    //         callAccepted={context.callAccepted}
    //         callEnded={context.callEnded}
    //         stream={context.stream}
    //         call={context.call}
    //       />
    //     )}
    //   </SocketContext.Consumer>
      
    // </ContextProvider>
     
    //     </>
    // );
    // };

    // export default VideoChat;
