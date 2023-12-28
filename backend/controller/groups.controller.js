const groupdb = require("../model/groups.model");
const groupModel = groupdb.Group;
const userdb = require("../model/user.model");
const userModel = userdb.User;
const db = require("../utils/db.connection");

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
  const { title, description, owner } = req.body;
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
      });

      const storedGroup = await group.save();

      const userId = req.userId; //authenticate middleware sets user information in req.user

      if (userId) {
        const user = await userModel.findById(userId);
        if (user) {
          user.group.push(storedGroup._id);
          user.memberOf.push(storedGroup._id)
          await user.save();
        }
      }

      console.log(">>>>>>>>>>> group created successfully");
      return resp.status(200).json({
        status: 200,
        success: true,
        Message: "Group Created Successfullly,",
        data: storedGroup,
      });
    }
  } catch (error) {
    error;
  }
};

// join Group API

const joinGroup = async (req, resp) => {
  const { id } = req.body;
  console.log('>>>>>>>>>>>id', id)
  try {
    if (!id) {
      resp.status(404).json({
        status: 404,
        success: false,
        message: "Require ID",
      });
    }
    const Group = await groupModel.find({_id:id });
    const user = req.user;
    // console.log('>>>>>>>>>>>user grp', user.memberOf)
    // console.log('>>>>>>>>>>> group id', Group[0])
    user.memberOf.push(Group[0]._id)
    await user.save();

    // console.log('>>>>>>>>>>>user mem',user.name, user.memberOf)
    // console.log('>>>>>>>>>>>user data', user)

   console.log('>>>>>>>>>>> GROUP JOINED SUCCESSFULLY')
    resp.status(200).json({
      status: 200,
      success: true,
      message:"group joined ",
      data: Group,
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
        message:"fetching all groups",
        Groups: Groups,
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>", err);
  }
};

//all group that user join and create
const allJoinAndCreated = async (req, resp) => {
  
  // const users = await userModel.find({});
  const user = req.user;
  console.log('>>>>>>>>>>>user mem', user.memberOf)
  const memberOf  = user.memberOf
  const Groups = await groupModel.find({_id:memberOf});

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
        message:"fetching all groups",
        Groups: Groups,
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>", err);
  }
};





module.exports = { demo, createGroup, allGroups, joinGroup,allJoinAndCreated};
