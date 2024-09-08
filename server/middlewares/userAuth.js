const Model = require("../models/user");
const message = require("../utility/message");
const responseCode = require("../utility/responseCode");
const utility = require("../utility/utils");
const resMessage = message.MESSAGES.en;



const userAuthService = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Auth token missing" });

    const token = authHeader.startsWith("Bearer")
      ? authHeader.slice(7)
      : authHeader.split(" ")[1];

    const decoded = await utility.jwtVerify(token);
    const user = await Model.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error: ", error);
    res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = {
  userAuthService,
};
