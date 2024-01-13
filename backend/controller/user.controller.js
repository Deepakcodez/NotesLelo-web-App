const bcrypt = require("bcrypt");
const userdb = require("../model/user.model");
const userModel = userdb.User;

// demo
const demo = async (req, resp) => {
  resp.send({
    status: 200,
    message: "working demo api",
  });
};

//registration
const register = async (req, resp) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return resp.status(422).json({
      status: 422,
      success: false,
      error: "fill all the details",
    });
  }
  if (password !== confirmPassword) {
    return resp.status(422).json({
      status: 422,
      success: false,
      error: "confirm password not matchded",
    });
  }

  if (password.length < 6) {
    return resp.status(422).json({
      status: 422,
      success: false,
      error: "password should be at least 6 characters",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return resp.status(400).json({
        status: 400,
        success: false,
        message: "User already exists",
      });
    } else {
      const user = new userModel({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      const storeData = await user.save();

      // console.log(">>>>>>>>>>> Register successful");
      resp.status(200).json({
        status: 200,
        success: true,
        message: "Registration successful",
        data: storeData,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error occurred
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }

      console.error("Validation error:", validationErrors);
      resp.status(422).json({
        status: 422,
        success: false,
        message: "Validation error",
        validationErrors,
      });
    } else {
      // Other unexpected errors
      console.error("Error in saving data to db", error);
      resp.status(500).json({
        status: 500,
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

//login
const login = async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(422).send({
      status: 422,
      success: false,
      message: "email or password missing",
    });
  }

  // email or email:email are same thing

  try {
    const user = await userModel.findOne({ email });


    if(!user){
      resp.status(422).send({
        status: 422,
        success: false,
        message: "something incorrect",
      });
    }
    if (user) {
      const isMatch = await bcrypt.compare(String(password), user.password);
      // console.log("Provided password:", password);
      // console.log("Hashed password from the database:", user.password);
      // console.log("Is password match?", isMatch);
      
      
      if (!isMatch) {
        resp.status(422).send({
          status: 422,
          success: false,
          message: "something incorrect",
        });
      } else {
        // generateAuthToken is defined in the user schema
        const token = await user.generateAuthToken();
        // console.log("Generated token:", token);

        // storing token in browser cookies
        resp.cookie("token", token, {
          expires: new Date(Date.now() + 90000000),
          httpOnly: true,

        });


        const result = {
          user,
          token,
        };

        return resp.status(200).send({
          status: 200,
          success: true,
          message: "welcome",
          data: result,
        });
      }
    }
  } catch (error) {
    console.log("error in finding user,", error.message);
    resp.status(401).send({
      status: 401,
      success: false,
      message: "internal server error",
    });
  }
};




// is varify to authonenticate user 

const isVarify = async (req,resp) => {

  try {
    const user = await userModel.findOne({_id:req.userId});
    // console.log('>>>>>>>>>>>', user._id,"req id",req.userId)
    resp.status(201).json({
      status :201,
      success:true,
      message: "user authenticated",
      data :user
    })
  } catch (error) {
    resp.status(401).json({
      status :401,
      success:false,
      message: "user unauthenticated",
    
    })
  }

};

module.exports = { demo, register, login, isVarify };
