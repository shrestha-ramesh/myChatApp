const express = require('express');
const app = express();
app.use(express.json());
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const server = http.createServer(app);
const { generateMessage }= require('./utils/messages');
const Filter = require('bad-words');
const io = socketio(server);

const {addUser, removeUser, getUser, getUsersInRoom } = reqire('/utils/users');
const publicDirectory=path.join(__dirname,'..');
app.use(express.static(publicDirectory));