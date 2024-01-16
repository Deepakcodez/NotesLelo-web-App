const mongoose = require("mongoose");
const demandSchema = new mongoose.Schema(
  {
   
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    demand:[
        {
            message:{
                type : String,
                required : true
            }
        }
    ],

  },

  { timestamps: true }
);

const Demand = mongoose.model("Demand", demandSchema);
module.exports = { Demand };
