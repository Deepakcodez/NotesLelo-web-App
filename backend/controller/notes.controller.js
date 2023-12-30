const { Schema } = require('mongoose');
const notesDb = require('../model/notes.model');
const notesModel=notesDb.Post
const cloud = require('../utils/cloudinary');


const uploadFile = async(req,res)=>{
    const { caption, description } = req.body;
    try {
        
        const result = await cloud.uploadOncloudinary(req.file.path);
        const notesSchema = new notesModel({
            caption,
            description,
            pdf: {
                url:result.secure_url,
              }
        })
        console.log(result);
        const record = await notesSchema.save();
        res.status(200).json({
            success:true,
            status:200,
            message:"File uploaded successfully!",

            url:record
        });

    } catch(error) {
        res.status(400).json({
            success:false,
            status:400,
            message:error.message

        });
    }
}

module.exports={uploadFile}