
const groupdb = require("../model/groups.model");
const groupModel = groupdb.Group;
const demanddb = require("../model/demand.model");
const demandModel = demanddb.Demand;
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
      });
  
      // Add the new demand to the group's demands array
      currentGroup.demands.push(newDemand._id);
      await currentGroup.save();
  
      resp.send(responseSender(true, 200, "Demand added successfully", newDemand));
    } catch (error) {
      resp.send(responseSender(false, 500, "Internal server error", null));
    }
  };
  module.exports = {demo,addDemand}