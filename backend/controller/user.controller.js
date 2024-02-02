const bcrypt = require("bcrypt");
const userdb = require("../model/user.model");
const userModel = userdb.User;
const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const responseSender = require("../utils/responseSender");



// Registration
const register = async (req, resp) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return resp.status(422).json({
      status: 422,
      success: false,
      error: "Fill in all the details",
    });
  }

  if (password !== confirmPassword) {
    return resp.status(422).json({
      status: 422,
      success: false,
      error: "Confirm password does not match",
    });
  }

  if (password.length < 6) {
    return resp.status(422).json({
      status: 422,
      success: false,
      error: "Password should be at least 6 characters",
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

      // Code for sending email
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "noteslelo.app@gmail.com",
          pass: "lplj hjxv hmjx lrnw",
        },
      });

      var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
          name: 'NotesLelo',
          link: 'https://yourapp.com/', // Change this URL to your app's URL
        },
      });


      // Email template
var emailToSend = {
  subject: 'Welcome to NotesLelo',
  body: {
      greeting: `Dear ${name} ,`,
      intro: 'Thank you for choosing NotesLelo! We are thrilled to welcome you on board and appreciate the opportunity to serve you.',
      action: {
          instructions: 'To get started and confirm your account, please click the button below:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'Confirm Your Account',
              link: 'https://yourapp.com/confirm?s=d9729feb74992cc3482b350163a1a010' // Change this URL to the actual confirmation endpoint
            }
      },
      additionalInfo: 'By confirming your account, you\'ll gain access to all the exciting features and benefits that NotesLelo has to offer.',
      outro: 'If you have any questions or need assistance, feel free to reply to this email. We\'re here to help!',
      closing: 'Best regards,',
      signature: 'The NotesLelo Team'
  }
};

      // Generate an HTML email with the provided contents
      var emailBody = mailGenerator.generate(emailToSend);

      let message = {
        from: 'noteslelo.app@gmail.com',
        to: email,
        subject: "Welcome to NotesLelo",
        html: emailBody,
      };

      await transporter.sendMail(message);

      resp.status(200).json({
        status: 200,
        success: true,
        message: "Registration successful",
        data: storeData,
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error in saving data to db", error);
    resp.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Demo
const demo = async (req, resp) => {
  resp.send({
    status: 200,
    message: "Working demo API",
  });
};

module.exports = {
  register,
  demo,
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

    if (!user) {
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

const isVarify = async (req, resp) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    // console.log('>>>>>>>>>>>', user._id,"req id",req.userId)
    resp.status(201).json({
      status: 201,
      success: true,
      message: "user authenticated",
      data: user,
    });
  } catch (error) {
    resp.status(401).json({
      status: 401,
      success: false,
      message: "user unauthenticated",
    });
  }
};


const likesOnOwnNotes=(req,resp)=>{
  
    try {
      
      
    } catch (error) {
      return  resp.send(responseSender(false, 500, "internal server error", null));
    }
}

module.exports = { demo, register, login, isVarify };
