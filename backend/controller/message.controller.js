// addMessage.js
const messageDb = require("../model/message.model");
const responseSender = require('../utils/responseSender'); // Require directly

const messageModel = messageDb.Message;

const demo = async (req, resp) => {
  return resp.send(responseSender(true, 200, "msg sent", null));
};

const addMessage = async (req, resp) => {
  try {
         const {from, to, message} = req.body;
         const data  = await messageModel.create({
            message: {text : message},
            users : [ from, to],
            sender : from,
         })
         if(!data){
            return resp.send(responseSender(false,400,"message data not available",data))
         }
         else{

             resp.send(responseSender(true, 200, "message sent", ));
         }
  } catch (error) {
    console.log('Error:', error);
    resp.send(responseSender(false, 500, 'Internal Server Error', null));
  }
};

const allMessages = async (req, resp) => {
    const { from, to } = req.body;
    try {
      const messages = await messageModel.find({
        users: { $all: [ to] },
      }).sort({ updatedAt: 1 });
  
      const projectMessages = messages.map((msg) => ({
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }));
  
      resp.json(responseSender(true, 200, 'Messages sent', projectMessages));
    } catch (error) {
      console.log('Error:', error);
      resp.send(responseSender(false, 500, 'Internal Server Error', null));
    }
  };

module.exports = { demo, addMessage ,allMessages};
