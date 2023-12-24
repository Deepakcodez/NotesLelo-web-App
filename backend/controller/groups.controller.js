const groupdb=require("../model/groups.model");
const groupModel=groupdb.Group;



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
    const{title,description} = req.body;
  try {
      if(!title){
          return resp.status(422).json({
              status:422,
              success:false,
              error:"Enter tittle of the group "
          });
      }
      const existingGroup = await groupModel.findOne({ title: title });

    if (existingGroup) {
      return resp.status(400).json({
        status: 400,
        success: false,
        message: "Group already exist already exists",
      });
    } 
      else{
        const group = new groupModel({
            title,
            description
        
          });
    
          const storeGroupData = await group.save();
    
          console.log(">>>>>>>>>>> Register successful");
          return resp.status(200).json({
              status:200,
              success:true,
              Message:"Group Created Successfullly,",
              data:storeGroupData
          });
      }
  } catch (error) {
    
  }

    
}


module.exports = {demo,createGroup}
