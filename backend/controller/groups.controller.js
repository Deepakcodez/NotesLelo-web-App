const groupdb=require("../model/groups.model");
const groupModel=groupdb.Group;
const userdb = require("../model/user.model");
const userModel = userdb.User;


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


<<<<<<< HEAD
const createGroup = async (req,res)=>{
    const{title,description} = req.body;
    if(!title){
        return res.status(422).json({
            status:422,
            success:false,
            error:"Enter tittle of the group "
        });
    }
    else{

        const group = new groupModel(
            {
                title:title,
                description:description
            }
        );
        const storeData = await group.save();
         res.status(200).json({
            status:200,
            success:true,
            Message:"Group Created Successfullly",
            data:storeData
        });
    }
=======

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
    
  }
>>>>>>> e3907db9c972b7dd389b7b8700c5f43683f3a90d

    
}


module.exports = {demo,createGroup}
