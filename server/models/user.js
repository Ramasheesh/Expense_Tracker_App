// const { string } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User_Model = new Schema({
    firstName:{type:String,default:" ",trim:true
    },
    lastName:{type:String,default:" ",trim:true
    },
    name:{type:String,default:" ",trim:true
    },
    email: { type: String, trim: true
    },
    phone: { type: String, trim: true, default: ""
    },
   
    password:{type:String,default:" " ,trim:true
    },
    isPhoneVerify:{type:Boolean,default:false
    },
    isEmailVerify:{type:Boolean,default:false
    },
    isLogin:{type:Boolean,default:false},
    token:{type:String,default:' ', select: false},

},
    {
        timestamps: true,
    }
);

const User = mongoose.model('userDatas',User_Model)
module.exports = User
