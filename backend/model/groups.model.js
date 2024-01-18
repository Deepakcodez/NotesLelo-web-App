const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const groupSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 1,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },

    owner: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    demands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Demand",
      },
    ],

    notes:{
      type:mongoose.Schema.Types.ObjectId,
      ref : "Post"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
module.exports = { Group };
