
const demanddb = require("../model/demand.model");
const demandModel = demanddb.Demand;


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

  module.exports = {demo}