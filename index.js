let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let {join, getUser} = require('./utils/user');
let createMessage = require('./utils/message');
let bot = 'Multimix';
 
io.on('connection', (socket) => {

    socket.on('join',({displayName, roomName}) =>{

        let user = join(socket.id, displayName, roomName);
        socket.join(roomName);

        socket.broadcast.to(user.roomName)
        .emit('server-message', createMessage(bot,`${user.displayName} has joined.`));



    });
 
  
 
    socket.on('client-message', msg => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('server-message', createMessage(user.username, msg));
      });


      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if (user) {
          io.to(user.room).emit(
            'server-message',
            createMessage(bot, `${user.displayName} has left`)
          );
    
          
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
      });

});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});