import React, { useState,useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material/';
import { styled } from '@mui/system';

import { SocketContext } from '../Context';
const sidebarStyles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      flexDirection: 'column',
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      '@media (max-width: 600px)': {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
  };
  
  const Sidebar = ({ children , id,isVolunteer}) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    console.log("id",id)
    return (
        <Container style={sidebarStyles.container}>
          <Paper elevation={10} style={sidebarStyles.paper}>
            <form style={sidebarStyles.root} noValidate autoComplete="off">
              <Grid container style={sidebarStyles.gridContainer}>
                <Grid item xs={12} md={6} style={sidebarStyles.padding}>
      
                  {callAccepted && !callEnded ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PhoneDisabled fontSize="large" />}
                      fullWidth
                      onClick={leaveCall}
                      style={sidebarStyles.margin}
                    >
                      Hang Up
                    </Button>
                  ) : (
                    isVolunteer && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Phone fontSize="large" />}
                        fullWidth
                        onClick={() => callUser(id)}
                        style={sidebarStyles.margin}
                      >
                        Start Meeting
                      </Button>
                    )
                  )}
                </Grid>
              </Grid>
            </form>
            {children}
          </Paper>
        </Container>
      );
  };
  
  export default Sidebar;