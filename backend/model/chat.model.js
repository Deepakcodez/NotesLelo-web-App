const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    senderId:{
            type:mongoose.Schema.Types.ObjectId;
            ref : 'User',

    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId;
        ref : 'User',
    },
    message:{
        type:String,
        required:true,
    }

},{timestamps:true})

const Chat = mongoose.model("Chat", chatSchema);
module.exports = { Chat };
