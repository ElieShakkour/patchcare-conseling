const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const chattingHandler = require('./sockets/chattingHandler');

const path = require('path');
const app = express();
const port = process.env.APP_PORT;
const axios = require('axios');
const currentDirectory = __dirname;
const buildDirectory = path.join(currentDirectory, 'build');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use(express.static(buildDirectory));
const auth = require('./routes/auth');
const register = require('./routes/register');
const diseaseApi = require('./routes/diseaseApi');
const conditions = require('./routes/conditions');
const volunteerRegister = require('./routes/registerVolunteer');
const medicalRecord = require('./routes/medicalRecord');
const userInfo = require('./routes/userInfo');
const volunteers = require('./routes/volunteer');
const appointments = require('./routes/appointments');
const chats = require('./routes/chat')
server = http.createServer(app); 

const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send({ message: 'hello from patch adams' });
});
 chattingHandler(io);

app.use('/api/auth', auth);
app.use('/api', register);
app.use('/api', diseaseApi);
app.use('/api', conditions);
app.use('/api', volunteerRegister);
app.use('/api', medicalRecord);
app.use('/api', userInfo);
app.use('/api', volunteers);
app.use('/api', appointments);
app.use('/api',chats)
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  






