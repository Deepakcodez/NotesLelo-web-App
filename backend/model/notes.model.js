const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const postSchema = new Schema(
  {
    caption: {
      type: String,
      minlength: 1,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pdf: {
      //we will handle later  upload pdf on cloudinary
      public_id: String,
      url: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Group"
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        Comment: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
