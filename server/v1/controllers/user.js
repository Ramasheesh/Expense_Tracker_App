const message = require("../../utility/message");
const utility = require("../../utility/utils");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Model = require("../../models/user");
const config = require("config");
const responseCode = require("../../utility/responseCode");
const errorMessage = message.MESSAGES.en;

//signup
const signup = async (req, res) => {
  try {
    let user;
    const data = req.body;
    data.password = await utility.hashPasswordUsingBcrypt(data.password);
    if (data.email) {
      user = await Model.findOne({
        email: data.email,
      });
      // console.log(user);
      if (user) {
        return res.json(errorMessage.DUPLICATE_EMAIL);
      } else {
        user = await Model.create(data);
        return res
          .status(responseCode.CREATED)
          .json({ message: errorMessage.REGISTRATION_COMPLETED, user });
      }
    }
    if (data.phone) {
      user = await Model.findOne({
        phone: data.phone,
      });
      //     // console.log(user)
      if (user) {
        return res.json(errorMessage.DUPLICATE_PHONE);
      } else {
        user = await Model.create(data);
        return res
          .status(responseCode.CREATED)
          .json({ message: errorMessage.REGISTRATION_COMPLETED, user });
      }
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const login = async (req, res) => {
  try {
    const data = req.body;
    // console.log('data: ', data);
    let user;

    if (data.email) {
      user = await Model.findOne({ email: data.email, isLogin: false });
    } else if (data.phone) {
      user = await Model.findOne({ phone: data.phone, isLogin: false });
    }

    if (!user) {
      return res
        .status(400)
        .json(errorMessage.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await utility.comparePasswordUsingBcrypt(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json(errorMessage.INVALID_CREDENTIALS);
    }
    const token = await utility.jwtSign({ id: user._id });

    if(data.email){
    user.isEmailVerify = true
    }else{
    user.isPhoneVerify = true
    }
    user.isLogin = true
    // user.token = token
    await user.save();
    return res
      .status(responseCode.OK)
      .json({ message: errorMessage.LOGIN_SUCCESS,token, user });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};

const signOut = async (req, res) => {
  try {
    const data = new ObjectId(req.user._id);
    // console.log('data: ', data);
    const user = await Model.findOne({ _id: data ,isLogin: true });
    // console.log('user: ', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isLogin = false;
    user.token = '';  
    console.log('user: ', user);
    await user.save();  

    return res.status(200).json({ message: "Sign-out successful" });
  } catch (error) {
    console.error('Error during sign-out:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  signup,
  signOut,
};
