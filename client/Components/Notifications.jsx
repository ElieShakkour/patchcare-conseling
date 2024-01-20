import React, { useContext } from 'react';
import { Button } from '@mui/material';

import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>Meeting has started</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Join
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
