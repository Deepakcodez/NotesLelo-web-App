const { Schema } = require('mongoose');
const notesDb = require('../model/notes.model');
const notesModel = notesDb.Post;
const cloud = require('../utils/cloudinary');

const uploadFile = async (req, res) => {
  const { caption, description } = req.body;

  try {
    // Validate file and perform file upload to Cloudinary
    const result = await cloud.uploadOncloudinary(req.file.path);

    // Check if the upload was successful
    if (!result) {
      throw new Error('File upload to Cloudinary failed.');
    }

    // Create a new notes record with the Cloudinary URL
    const notesSchema = new notesModel({
      caption,
      description,
      pdf: {
        url: result.secure_url,
      }
    });

    // Save the record to the database
    const record = await notesSchema.save();

    // Return a success response
    res.status(200).json({
      success: true,
      status: 200,
      message: 'File uploaded successfully!',
      url: record
    });
  } catch (error) {
    // Handle errors and return an appropriate response
    res.status(400).json({
      success: false,
      status: 400,
      message: error.message
    });
  }
};

module.exports = { uploadFile };
