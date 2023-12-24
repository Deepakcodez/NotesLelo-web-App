const jwt = require("jsonwebtoken");
const userdb = require("../model/user.model");
const userModel = userdb.User;
const secretKey = "NotesLeloSecretKey";

const authenticate = async (req, resp, next) => {
  try {

  
    // take the data from the headers in token variable
    const token = req.headers.authorization;

    // Verify the token with secret key which we used in generating token in userModel page
    const decoded = jwt.verify(token, secretKey);

    // You can access the decoded payload

    console.log("Decoded Token:", decoded);  
     
    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) throw new Error("user unavailable");
//    sending below data to the req and capture it in isVarify function
    req.token=token;
    req.user = user;
    req.userId = user._id

    console.log('>>>>>>>>>>>', req.user)

    // Proceed with the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    resp.status(401).send({
      status: 401,
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = authenticate;
