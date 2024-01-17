const mongoose = require("mongoose");
const demandSchema = new mongoose.Schema(
    {
        message: {
          type: String,
          required: true,
        },
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true,
          },
      },

  { timestamps: true }
);

const Demand = mongoose.model("Demand", demandSchema);
module.exports = { Demand };
