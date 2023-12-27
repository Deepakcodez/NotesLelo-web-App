const jwt = require('jsonwebtoken');
const userdb = require('../model/user.model');
const userModel = userdb.User;
const secretKey = 'NotesLeloSecretKey';

const authenticate = async (req, resp, next) => {
  const tokenFromHeader = req.headers.token;
  console.log('>>>>>>>>>>>header token', tokenFromHeader)
  try {
    // Check for token in headers

    // Check for token in cookies
    const tokenFromCookie = req.cookies.token;
    console.log('>>>>>>>>>>>', tokenFromCookie)

    // Choose the source of the token (either from headers or cookies)
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
      return resp.status(401).json({
        status: 401,
        success: false,
        message: 'Token unavailable',
      });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('User unavailable');
    }

    req.token = token;
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    resp.status(401).send({
      status: 401,
      success: false,
      message: 'Unauthorized user',
    });
  }
};

module.exports = authenticate;
