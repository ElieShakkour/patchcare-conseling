import React, { useState, useEffect,useContext } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material/';
import { SocketContext } from '../Context';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
const useStyles = styled((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));
  
  const VideoPlayer = ({name,profile,otherUserName}) => {
    const {callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    const classes = useStyles();
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const [showVideo,setShowVideo] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if(myVideo.current){ 
      if (myVideo.current && myVideo.current.srcObject) {
        const videoTrack = myVideo.current.srcObject.getVideoTracks()[0];
        if (videoTrack) {
          setIsVideoEnabled(videoTrack.enabled);
        }
  
        const audioTracks = myVideo.current.srcObject.getAudioTracks();
        if (audioTracks.length > 0) {
          setIsAudioEnabled(audioTracks[0].enabled);
        }
      }
    }
    }, []);
    useEffect(()=>{
if(callEnded){
  navigate('/');
}
    },[callEnded])
  
    const toggleVideo = () => {
      if(myVideo.current){ 
      setIsVideoEnabled((prevValue) => !prevValue);
      if (myVideo.current && myVideo.current.srcObject) {
        const videoTrack = myVideo.current.srcObject.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.enabled = isVideoEnabled;
        }
      }
    }
    };
  
    const toggleAudio = () => {
      if(myVideo.current){ 
      setIsAudioEnabled((prevValue) => !prevValue);
      if (myVideo.current && myVideo.current.srcObject) {
        const audioTracks = myVideo.current.srcObject.getAudioTracks();
        audioTracks.forEach((track) => {
          track.enabled = isAudioEnabled;
        });
      }
    }
    };
    
//   const handleVideoChange = (event) => {
//     event.preventDefault();
//     try {
//       setIsVideoEnabled(!isVideoEnabled);
//       if (event.target.checked) {
//         toggleVideo();
//       } else {
//         setIsVideoEnabled(!false);
//       }
//     } catch (error) {
//       console.log(error);
//     }

//   }

  
    return (
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
              {isVideoEnabled&&( <img src={profile} style={{ height: 50, width: 50 }} alt="Profile" />
         )}
              <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
              <Button
                onClick={toggleVideo}
                variant="contained"
                color="secondary"
                startIcon={isVideoEnabled ? <VideocamOff /> : <Videocam />}
              />
              <Button
                onClick={toggleAudio}
                variant="contained"
                color="primary"
                startIcon={isAudioEnabled ? <MicOff /> : <Mic />}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{otherUserName || 'Name'}</Typography>
              <video playsInline ref={userVideo} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
      </Grid>
    );
  };
  
  export default VideoPlayer;
  