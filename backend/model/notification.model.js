const mongoose = require('mongoose')
const notificationSchma = new mongoose.Schema({
    notification :{
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
            },
        receiver:{ 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
            },
        message:{
            type : String,
            required : true
        }
    },
   
},
 {timestamps:true}
);

const notification = mongoose.model('notification',notificationSchma);

module.exports ={notification};