const users = [];

function join(socketId, displayName, roomName){
    const user ={socketId, displayName, roomName};
    users.push(user);

    return user;
}

function getUser(socketId){
    return users.find(user => user.socketId == socketId);
}

function leaveRoom(id) {
    const index = users.findIndex(user => user.socketId === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}
  
  // Get room users
function getRoomUsers(roomName) {
    return users.filter(user => user.roomName === roomName);
}

module.exports = {join, getUser, leaveRoom, getRoomUsers};