const moment = require('moment');

function createMessage(dispalyName, msg) {
  return {
    
    dispalyName,
    msg,
    time: moment().format('h:mm a')
  };
}

module.exports = createMessage;