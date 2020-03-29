const moment = require('moment');

function createMessage(dispalyName, msg, socketId) {
  return {
    
    dispalyName,
    msg,
    socketId,
    time: moment().format('h:mm a')
  };
}

module.exports = createMessage;