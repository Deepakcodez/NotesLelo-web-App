// responseSender.js
const responseSender = (success, status, message, data) => {
    return {
      success: success,
      status: status,
      message: message,
      data: data,
    };
  };
  
  module.exports = responseSender;
  