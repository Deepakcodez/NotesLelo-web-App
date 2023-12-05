const mongoose = require('mongoose')
const { model, Schema } = mongoose


const userSchema = new  mongoose.Schema({
    
    name : {type:String,min: 2 ,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true}

}, { timestamps: true })

const User =  mongoose.model('User',userSchema)

module.exports= {User}