const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const secretKey = "NotesLeloSecretKey";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: [true, "email already exist"],
      validate(value) {
        if (!validator.isEmail(value)) {  
          throw new Error("not valid email");
        }
      },
    },
    password: {
      type: String,
      minlength: [6, "password must be  at least 6 characters"],
      required: [true, "please enter password"],
    },
    confirmPassword: {
      type: String,
      minlength: [6, "password must be  at least 6 characters"],
      required: [true, "please enter valid  password"],
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    savedNotes :[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Notes"
      }
    ],
    group:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    }],
    memberOf:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    }],
    avatar: {
      public_id: String,
      url: String,
    },
    likesOnOwnNotes:[{
      type  : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }],
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {

   // Remove expired tokens
   this.tokens = this.tokens.filter((tokenData) => {
    try {
      jwt.verify(tokenData.token, secretKey);
      return true; // Token is valid
    } catch (error) {
      return false; // Token is expired or invalid
    }
  });




    let GeneratedToken = jwt.sign({ _id: this._id }, secretKey, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: GeneratedToken });
    await this.save();
    return GeneratedToken;
  } catch (error) {
    console.error("Error generating authentication token:", error);
    throw new Error("Error generating authentication token");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
