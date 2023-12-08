const jwt = require("jsonwebtoken");
const userdb = require("../model/user.model");
const userModel = userdb.User;
const secretKey = "NotesLeloSecretKey";

const authenticate = async (req, resp, next) => {
  try {
    const token = req.headers.authorization;

    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // You can access the decoded payload
    // console.log("Decoded Token:", decoded);  

    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) throw new Error("user unavailable");

    req.token=token;
    req.user = user;
    req.userId = user._id

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
