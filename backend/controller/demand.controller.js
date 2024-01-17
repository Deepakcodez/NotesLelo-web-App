
const groupdb = require("../model/groups.model");
const groupModel = groupdb.Group;
const demanddb = require("../model/demand.model");
const demandModel = demanddb.Demand;
const userdb = require("../model/user.model");
const userModel = userdb.User;
const responseSender = require('../utils/responseSender')


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



  const addDemand = async (req, resp) => {
    const { textInput, groupId } = req.body;
    const userId = req.userId;
  
    try {
      const currentGroup = await groupModel.findById(groupId);
  
      if (!currentGroup) {
        return resp.send(responseSender(false, 404, "Group not found", null));
      }
  
      const newDemand = await demandModel.create({
        message: textInput,
        from: userId,
        to :  groupId,
      });
  
      // Add the new demand to the group's demands array
      currentGroup.demands.push(newDemand._id);
      await currentGroup.save();
  
      resp.send(responseSender(true, 200, "Demand added successfully", newDemand));
    } catch (error) {
      resp.send(responseSender(false, 500, "Internal server error", null));
    }
  };

 const demands= async(req,resp)=>{
 
     const { groupId} = req.params;
     try {

        if(!groupId){
          return  resp.send(responseSender(false,400,"group id not provided",null))
        }

       const demands =  await  demandModel.find({to : groupId})
          
    // Fetch user data for each demand
    const demandsWithUserData = await Promise.all(
      demands.map(async (demand) => {
        const user = await userModel.findById(demand.from);
        return {
          demand,
          user,
        };
      })
    );
    console.log('>>>>>>>>>>>', demandsWithUserData)
       

       resp.send(responseSender(true,200,"demands find succesfully",demandsWithUserData))
       
      
     } catch (error) {
        resp.send(responseSender(false,500,"internal server error",null))
     }
 }

  module.exports = {demo,addDemand,demands}