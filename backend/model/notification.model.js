const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    
        
        user:[{ 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
           
            }],
        message:{
            type : String,
           required : true,
        }
   
},
 {timestamps:true}
);

const notification = mongoose.model('notification',notificationSchema);

module.exports ={notification};