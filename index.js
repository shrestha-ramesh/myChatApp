const express = require('express');
const app = express();
app.use(express.json());
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const server = http.createServer(app);
