const users = [];

function join(socketId, displayName, roomName){
    const user ={socketId, displayName, roomName};
    users.push(user);

    return user;
}

function getUser(socketId){
    return users.find(user => user.socketId == socketId);
}

module.exports = {join, getUser};