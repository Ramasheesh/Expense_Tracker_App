const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = {
    hashPasswordUsingBcrypt: async (plainTextPassword) => {
        return bcrypt.hash(plainTextPassword, 10);
    },
    isEmail : (value) => {
        let  re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(value).toLowerCase());
   },
    isPhone : (value) => {
    let intRegex = /[0-9 -()+]+$/;
    return intRegex.test(value)
    },

    comparePasswordUsingBcrypt: async (password,hashPassword) => {
        // const hash = await bcrypt.genSalt(10);
        return bcrypt.compareSync(password, hashPassword)
    },
    jwtSign: async (payload) => {
        try {
            
            return jwt.sign(payload,config.get("jwtOption.jwtSecretKey"), { expiresIn: '48h' });
        } catch (error) {
            throw error;
        }
    },
    jwtVerify: async (token) => {
        return jwt.verify(token,  config.get("jwtOption.jwtSecretKey"));
    },

}

 



