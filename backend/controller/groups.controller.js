const groupdb=require("../model/groups.model");
const groupModel=groupdb.Group;
const userdb = require("../model/user.model");
const userModel = userdb.User;
const db = require("../utils/db.connection")


const demo= async(req,resp)=>{
  try{
    resp.send({
        status:200,
        message:"ready to use"
      });
  }catch(err){
    resp.send({
        err

      });
  }
};




// create group controller 

const createGroup = async (req,resp)=>{
    const{title,description,owner} = req.body;
  try {
      if(!title){
          return resp.status(422).json({
              status:422,
              success:false,
              error:"Enter tittle of the group "
          });
      }
      const existingGroup = await groupModel.findOne({ title });

    if (existingGroup) {
      return resp.status(400).json({
        status: 400,
        success: false,
        message: "Group already exist",
      });
    } 
      else{
        const group = new groupModel({
            title,
            description,
            owner: [{ owner: req.userId }],
          });
    
          const storedGroupData = await group.save();

          const userId = req.userId; // Assuming your authenticate middleware sets user information in req.user

      if (userId) {
        const user = await userModel.findById(userId);
        if (user) {
          user.group.push(storedGroupData._id);
          await user.save();
        }
      }


     
    
          console.log(">>>>>>>>>>> group created successfully");
          return resp.status(200).json({
              status:200,
              success:true,
              Message:"Group Created Successfullly,",
              data:storedGroupData
          });
      }
  } catch (error) {
    error
  }

}    
const allGroups = async(req,res)=>{
   
    const Groups = await groupModel.find({});
    console.log(Groups)
    try{
     
        if(!Groups){
            res.status(404).json({
                status:404,
                successfalse,
                message:"not found"
            });
        }else{
        res.status(200).json({
            status:200,
            success:true,
            Groups:Groups
        });
        }
    }catch(err){
        err
    }

}



module.exports = {demo,createGroup,allGroups}
