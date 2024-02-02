const { Schema } = require("mongoose");
const notesDb = require("../model/notes.model");
const notesModel = notesDb.Post;
const groupdb = require("../model/groups.model");
const groupModel = groupdb.Group;
const userdb = require("../model/user.model");
const userModel = userdb.User;
const cloud = require("../utils/cloudinary");
const responseSender = require("../utils/responseSender");

const uploadFile = async (req, res) => {
  const { caption, description, groupId } = req.body;
  const userId = req.userId;
  try {
    // Validate file and perform file upload to Cloudinary
    const result = await cloud.uploadOncloudinary(req.file.path);

    // Check if the upload was successful
    if (!result) {
      throw new Error("File upload to Cloudinary failed.");
    }

    // Create a new notes record with the Cloudinary URL
    const notesSchema = new notesModel({
      caption,
      description,
      to: groupId,
      owner: userId,
      pdf: {
        url: result.secure_url,
      },
    });

    // Save the record to the database
    const record = await notesSchema.save();
    // Update the Group document with the new notes _id
    await groupModel.findByIdAndUpdate(groupId, {
      $push: { notes: record._id },
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: { posts: record._id },
    });
    // Return a success response
    res.status(200).json({
      success: true,
      status: 200,
      message: "File uploaded successfully!",
      url: record,
    });
  } catch (error) {
    // Handle errors and return an appropriate response
    res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

const groupNotes = async (req, resp) => {
  const { groupId } = req.params;
  const userId = req.userId;

  if (!groupId) {
    resp.send(responseSender(false, 402, "group Id not provided", null));
    return;
  }

  try {
    const currentGroupNotes = await notesModel.find({ to: groupId });
    const notesWithUserData = await Promise.all(
      currentGroupNotes.map(async (notes) => {
        // const user = await userModel.findById(userId);
        console.log(">>>>>>>>>>>notes owner", notes.owner);
        const user = await userModel.findById(notes.owner);
        return {
          notes,
          user,
        };
      })
    );

    if (!currentGroupNotes.length) {
      return resp.send(responseSender(false, 402, "notes not available", null));
    }

    console.log(">>>>>>>>>>currentGroupNotes>", notesWithUserData);
    return resp.send(
      responseSender(
        true,
        200,
        "Notes retrieved successfully",
        notesWithUserData
      )
    );
  } catch (error) {
    return resp.send(responseSender(false, 500, "internal server error", null));
  }
};

const addLikeOrDislike = async (req, resp) => {
  const { notesId } = req.params;
  const userId = req.userId;

  try {
    // Check if the notes exist
    const notes = await notesModel.findById(notesId);

    if (!notes) {
      return resp
        .status(404)
        .send(responseSender(false, 404, "Notes not found", null));
    }

    // Check if the user has already liked the notes
    const userLiked = notes.likes.some((id) => id.equals(userId));

    // Find the user by userId
    const user = await userModel.findById(notes.owner);
    console.log("notes owner user",user);

    if (userLiked) {
      // User has already liked, remove the like (dislike)

      notes.likes.pull(userId);

      // Remove the note from user's likesOnOwnNotes
      user.likesOnOwnNotes.pull(userId);
    } else {
      // User has not liked, add the like
      notes.likes.push(userId);
      // Add the note to user's likesOnOwnNotes
      user.likesOnOwnNotes.push(userId);
    }

    await notes.save();
    await user.save(); // Save the changes to the user

    // Fetch the updated notes with user data
    const updatedNotes = await notesModel
      .findById(notesId)
      .populate({
        path: "owner",
        populate: { path: "likesOnOwnNotes" },
      });

    return resp
      .status(200)
      .send(
        responseSender(true, 200, "Operation successful", updatedNotes.likes)
      );
  } catch (error) {
    return resp
      .status(500)
      .send(responseSender(false, 500, "Internal server error", null));
  }
};










const savedNotes = async (req, resp) => {
  const userId = req.userId;
  const { notesId } = req.body;
  if (!userId) {
    return resp.send(responseSender(false, 500, "user not defined", null));
  }

  if (!notesId) {
    return resp.send(responseSender(false, 500, "notes id not provided", null));
  }
  try {
    const userdata = await userModel.findById(userId);
    // Check if the user has already liked the notes
    const usersavednotes = userdata.savedNotes.some((id) => id.equals(notesId));

    if (usersavednotes) {
      // User has already liked, remove the saved

      await userdata.savedNotes.pull(notesId);
      await userdata.save();
      resp.send(
        responseSender(true, 200, "notes unsaved", userdata.savedNotes)
      );
    } else {
      // User has not saved, add the save
      await userdata.savedNotes.push(notesId);
      await userdata.save();
      resp.send(
        responseSender(
          true,
          200,
          "notes saved to saved-notes",
          userdata.savedNotes
        )
      );
    }
  } catch (error) {
    resp.send(responseSender(false, 500, "internal server error", null));
  }
};

const UserSavedNotes = async (req, resp) => {
  const savedNotesid = req.user.savedNotes;
  try {
    if (!savedNotesid) {
      resp.send(responseSender(true, 200, "not any saved notes", null));
    }

    const savedNotes = await notesModel.find({ _id: savedNotesid });
    resp.send(responseSender(true, 200, " user saved notes", savedNotes));
  } catch (error) {
    resp.send(responseSender(false, 500, "internal server error", null));
  }
};

const userNotes = async (req, resp) => {
  const userNotesArray = req.user.posts;
  console.log(">>>>>>>>>>>notesId", userNotesArray);

  if (!userNotesArray) {
    return resp.send(responseSender(false, 500, "Notes not found", null));
  }

  try {
    const notes = await notesModel.find({ _id: userNotesArray });

    if (!notes || notes.length === 0) {
      return resp.send(responseSender(false, 404, "Notes not found", null));
    }

    console.log(req.user); // Log user information
    return resp.send(
      responseSender(true, 200, "Shared notes fetched successfully", notes)
    );
  } catch (error) {
    console.error("Error fetching user notes:", error);
    return resp.send(responseSender(false, 500, "Internal server error", null));
  }
};

module.exports = {
  uploadFile,
  groupNotes,
  addLikeOrDislike,
  savedNotes,
  UserSavedNotes,
  userNotes,
};
