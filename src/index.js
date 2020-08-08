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

const {addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const publicDirectory=path.join(__dirname,'..');
app.use(express.static(publicDirectory));
io.on('connection',(socket)=>{
    socket.on('join',(options,callback)=>{
        const { error, user }=addUser({id:socket.id,...options})
        if(error){ return callback(error);}
        socket.join(user.room);
        socket.emit('message', generateMessage('Welcome'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username}has joined.`));
        io.to(user.room).emit('roomData',{ 
            room: user.room,
            Users:getUsersInRoom(user.room)
        });
        callback()
    })
    socket.on('disconnect', ()=>{
        const user=removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', generateMessage(`${user.username} has left.`))
            io.to(user.room).emit('roomData', {
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }
    })
    socket.on('sendLocation', (location, callback)=>{
        const user = getUser(socket.id);
        console.log(user.username);
        io.to(user.room).emit('locationMessage', generateMessage(user.username,location))
        callback()
    })
});

const port= process.env.PORT | 3000;

server.listen(port,()=>{
    console.log("Server is running at port "+port);
})