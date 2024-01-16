const mongoose = require('mongoose')
const notificationSchma = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        
        },
    receiver:{ 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
       
        },
    message:{
        type : String,
       
    }
   
},
 {timestamps:true}
);

const notification = mongoose.model('notification',notificationSchma);

module.exports ={notification};