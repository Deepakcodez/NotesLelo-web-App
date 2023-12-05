const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require('bcrypt')
const validator = require("validator");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not valid email");
        }
      },
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    confirmPassword: {
      type: String,
      minLength: 6,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// pre is like a middleware perform the function before saving the user schema , here we have to use classic function because we use this keyword which is only applicable in classic function not with arrow function
userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password , 10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword , 10);
    next()
})



const User = mongoose.model("User", userSchema);
module.exports = { User };
