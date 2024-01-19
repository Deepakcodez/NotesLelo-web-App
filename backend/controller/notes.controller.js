  const { Schema } = require('mongoose');
  const notesDb = require('../model/notes.model');
  const notesModel = notesDb.Post;
  const groupdb = require("../model/groups.model");
  const groupModel = groupdb.Group;
  const userdb = require("../model/user.model");
  const userModel = userdb.User;
  const cloud = require('../utils/cloudinary');
  const responseSender = require('../utils/responseSender');

  const uploadFile = async (req, res) => {
    const { caption, description,groupId } = req.body;
    const userId = req.userId;
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
        "to": groupId,
        owner: userId,
        pdf: {
          url: result.secure_url,
        }
      });

      // Save the record to the database
      const record = await notesSchema.save();
  // Update the Group document with the new notes _id
  await groupModel.findByIdAndUpdate(groupId, { $push: { notes: record._id } });
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

  const groupNotes = async (req, resp) => {
    const { groupId } = req.params;
    const userId = req.userId;
  
    if (!groupId) {
      resp.send(responseSender(false, 402, 'group Id not provided', null));
      return;
    }
  
    try {
      const currentGroupNotes = await notesModel.find({ "to": groupId });
      const notesWithUserData = await Promise.all(
        currentGroupNotes.map(async (notes) => {
          const user = await userModel.findById(userId);
          return {
            notes,
            user,
          };
        })
      );
  
      if (!currentGroupNotes.length) {
        return resp.send(responseSender(false, 402, 'notes not available', null));
      }
  
      console.log('>>>>>>>>>>currentGroupNotes>', notesWithUserData);
      return resp.send(responseSender(true, 200, 'Notes retrieved successfully', notesWithUserData));
    } catch (error) {
      return resp.send(responseSender(false, 500, 'internal server error', null));
    }
  };
  
  module.exports = { uploadFile, groupNotes };
  

