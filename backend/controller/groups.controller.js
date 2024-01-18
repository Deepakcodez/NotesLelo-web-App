const groupdb = require("../model/groups.model");
const { notification } = require("../model/notification.model");
const groupModel = groupdb.Group;
const userdb = require("../model/user.model");
const userModel = userdb.User;
const db = require("../utils/db.connection");
const mongoose = require("mongoose");

const demo = async (req, resp) => {
  try {
    resp.send({
      status: 200,
      message: "ready to use",
    });
  } catch (err) {
    resp.send({
      err,
    });
  }
};

// create group API

const createGroup = async (req, resp) => {
  const { title, description } = req.body;
  try {
    if (!title) {
      return resp.status(422).json({
        status: 422,
        success: false,
        error: "Enter tittle of the group ",
      });
    }
    const existingGroup = await groupModel.findOne({ title });

    if (existingGroup) {
      return resp.status(400).json({
        status: 400,
        success: false,
        message: "Group already exist",
      });
    } else {
      const group = new groupModel({
        title,
        description,
        owner: [{ owner: req.userId }],
        members: [{ members: req.userId }],
      });

      const storedGroup = await group.save();

      const userId = req.userId; //authenticate middleware sets user information in req.user

      if (userId) {
        const user = await userModel.findById(userId);
        if (user) {
          user.group.push(storedGroup._id);
          user.memberOf.push(storedGroup._id);
          await user.save();
        }
      }

      const newNotification = new notification(
        {
          user: req.userId,
          message:"group created"
        }
      );
      const savedNotification =  await newNotification.save();
      console.log("this is notification");
      console.log(savedNotification);

      return resp.status(200).json({
        status: 200,
        success: true,
        Message: "Group Created Successfullly,",
        data: storedGroup,
        dataNotification:savedNotification
      });
    }
  } catch (error) {
    return resp.status(400).json({
      status: 400,
      success: false,
      Message: "internal server error",error,
    });
  }
};

// join Group API

const joinGroup = async (req, resp) => {
  const { id } = req.body;
  // console.log(">>>>>>>>>>>id", id);
  try {
    if (!id) {
      resp.status(404).json({
        status: 404,
        success: false,
        message: "Require ID",
      });
    }
    const Group = await groupModel.findById(id);
    // console.log(">>>>>>>>>>>", Group._id);
    const user = req.user;
    user.memberOf.push(Group._id);
    Group.members.push(req.userId);
    await user.save();
    await Group.save();


    const newNotification = new notification(
      {
        user: req.userId,
        message:"Group Joined"
      }
    )
    const savedNotification =  await newNotification.save()
    console.log(savedNotification);
    console.log(">>>>>>>>>>> GROUP JOINED SUCCESSFULLY");
    resp.status(200).json({
      status: 200,
      success: true,
      message: "group joined ",
      data: Group,
      notificationData:savedNotification
    });
  } catch (error) {
    console.log(">>>>>>>>>>>", error);
  }
};

//all groups API
const allGroups = async (req, resp) => {
  const Groups = await groupModel.find({});
  // console.log(Groups)
  try {
    if (!Groups) {
      resp.status(404).json({
        status: 404,
        success: false,
        message: "not found",
      });
    } else {
      resp.status(200).json({
        status: 200,
        success: true,
        message: "fetching all groups",
        Groups: Groups,
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>", err);
  }
};

//all groups that user join and create
const allJoinAndCreated = async (req, resp) => {
  const user = req.user;
  const { id } = req.params;
  // console.log('>>>>>>>>>>>user mem', user.memberOf)
  const memberOf = user.memberOf;

  const Groups = await groupModel.find({ _id: memberOf });

  // console.log("all groups",Groups)
  try {
    if (!Groups) {
      resp.status(404).json({
        status: 404,
        success: false,
        message: "not found",
      });
    } else {
      resp.status(200).json({
        status: 200,
        success: true,
        message: "fetching all groups",
        Groups: Groups,
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>", err);
  }
};

//getting group by id
//all groups that user join and create
const groupById = async (req, resp) => {
  const { id } = req.params;

  const Group = await groupModel.findById(id);

  // console.log("all groups",Groups)
  try {
    if (!Group) {
      resp.status(404).json({
        status: 404,
        success: false,
        message: "not found",
      });
    } else {
      resp.status(200).json({
        status: 200,
        success: true,
        message: "fetching all groups",
        data: Group,
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>", err);
  }
};

// update group  title and description  api

const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  // console.log(id);
  // console.log(title);

  try {
    // Check for empty title and description
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Title and description are required for the update.",
      });
    }

    const group = await groupModel.findById(id);

    if (!group) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Group Not Found",
      });
    }

    const groupOwnerId = group.owner[0].owner;
    const userId = req.userId;
    // console.log('>>>>>>>>>>>', groupOwnerId,userId)

    if (groupOwnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Access denied.",
      });
    }

    const updated = await groupModel.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true, runValidators: true } // Return the modified document and run validators
    );

    // console.log(updated);
    if (!updated) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Data Not Found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Data Updated Successfully",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};


// delete api for group
const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await groupModel.findById(id);

    if (!group) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Group Not Found",
      });
    }

    const groupOwnerId = group.owner[0].owner;
    const userId = req.userId;

    if (groupOwnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Access denied.",
      });
    }

    const deleted = await groupModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Data Not Found",
      });
    }

    // req.userId got from middleware
    const user = await userModel.findById(req.userId);
    const index = user.memberOf.indexOf(id);
    user.memberOf.splice(index, 1); // deleting ref of group in user model also
    await user.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Group Deleted Successfully",
      data: deleted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  demo,
  createGroup,
  allGroups,
  joinGroup,
  allJoinAndCreated,
  updateGroup,
  deleteGroup,
  groupById,
};
