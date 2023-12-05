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
      error: "password should be more than 7 characters",
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

      console.log(">>>>>>>>>>> Register successful");
      resp.status(201).json({
        status: 201,
        success: true,
        message: "Registration successful",
        data:storeData
      });
    }
  } 
  catch (error) {
    if (error.name === 'ValidationError') {
      // Mongoose validation error occurred
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }

      console.error('Validation error:', validationErrors);
      resp.status(422).json({
        status: 422,
        success: false,
        error: 'Validation error',
        validationErrors,
      });
    } else {
      // Other unexpected errors
      console.error('Error in saving data to db', error);
      resp.status(500).json({
        status: 500,
        success: false,
        error: 'Internal Server Error',
      });
    }
  }
};




//login
const login = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        resp.send({
          message: "user found",
          user: user,
        });
      } else {
        resp.send({ message: "user didn't found" });
      }
    }
  } catch (error) {
    console.log(">>>>>>>>>>>error in finding", err);
    resp.status(401).send({ message: "internal server error" });
  }
};

module.exports = { demo, register, login };
