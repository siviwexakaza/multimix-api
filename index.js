let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let {join, getUser, leaveRoom, getRoomUsers} = require('./utils/user');
let createMessage = require('./utils/message');
let bot = 'Multimix';

let cors = require('cors');
app.use(cors());

 
io.on('connection', (socket) => {

    socket.on('join',({displayName, roomName}) =>{

        let user = join(socket.id, displayName, roomName);
        socket.join(roomName);

        socket.broadcast.to(user.roomName)
        .emit('server-message', createMessage(bot,`${user.displayName} has joined.`));

        io.to(user.roomName).emit('roomUsers', {
            room: user.roomName,
            users: getRoomUsers(user.roomName)
        });


    });
 
    socket.on('client-message', msg => {
        const user = getUser(socket.id);
    
        io.to(user.roomName).emit('server-message', createMessage(user.username, msg));
      });


      socket.on('disconnect', () => {
        const user = leaveRoom(socket.id);
    
        if (user) {
          io.to(user.roomName).emit(
            'server-message',
            createMessage(bot, `${user.displayName} has left`)
          );
    
          
          io.to(user.roomName).emit('roomUsers', {
            room: user.roomName,
            users: getRoomUsers(user.roomName)
          });
        }
      });

});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('server started on port' + port);
});