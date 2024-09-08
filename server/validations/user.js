// const joi = require('joi');
// const { validate } = require('../../models/user');

// //______________________________________________________________________
// const validateSchema = async (inputs, schema) => {//?
//     try {
//         const { error, value } = schema.validate(inputs);
//         if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, "") : "";//?
//         else return false;
//     } catch (error) {
//         throw error;
//     }
// };
// //______________________________________________________________________

// const validateSignup = async (req)=>{
//         let schema = {}
//     schema = joi.object().keys({
//         // key:joi.string().optional(),
//         countyCode:joi.string().optional(),
//         password:joi.string().optional(),
//         phone:joi.string().optional(),
//         email:joi.string().optional(),
//         username:joi.string().optional(),
//         firstName:joi.string().optional(),
//         lastName:joi.string().optional(),
//         countryCode:joi.string().optional(),
//         country:joi.string().optional(),
//         state:joi.string().optional(),
//         city:joi.string().optional(),
//         age:joi.string().optional(),
//         gender:joi.string().optional(),

//     }).unknown(false)
//     let data =  await schema.validate(req.body, { abortEarly: false });

//   if (data.error) {
//     throw data.error
//   }
//   return false
// }
// //______________________________________________________________________

// const validateLogin = async (req)=>{
//         let schema = {};
//     schema = joi.object().keys({
//         key:joi.string().required(),
//         phone:joi.string().optional(),
//         email:joi.string().optional(),
//         code:joi.string().optional(),
//         password:joi.string().required(),
//         deviceType: joi.string().optional().valid("ANDROID", "IOS", "WEB"),
//         // deviceToken: joi.string()
//         //     .when('deviceType', { is: "ANDROID", then: joi.string().optional() })
//         //     .concat(joi.string().when('deviceType', { is: "IOS", then: joi.string().optional() })
//         //         .concat(joi.string().when('deviceType', { is: "WEB", then: joi.string().allow('', null).optional() })))


//     }).unknown(true)
//     let data =  await schema.validate(req.body, { abortEarly: false });
//     // return await validateSchema(req.body, schema , {abortEarly : false})
//     if(data.error) {
//         throw data.error
//     }
//     // return false
// }
// //______________________________________________________________________

// const validateSocialLogin = async(req)=>{
//     try {
//         let schema = {};
//     schema = joi.object().keys({
//         deviceType: joi.string().optional().valid("GOOGLE", "FACEBOOK", "MICROSOFT"),
//     })
//     // let data =  await schema.validate(req.body, { abortEarly: false });

//     return await schema.validate(req.body, {abortEarly : false})

//     } catch (error) {
//         throw error
//     }
// }
// //______________________________________________________________________

// const validateVerifyOtp = async (req)=>{

//         let schema = {};
//     schema  = joi.object().keys({

//         // code:joi.string().min(6).max(6),
//         // email:joi.string().optional(),
//         // phone: joi.string().min(10).max(10).required(),
//         // otp: joi.string().min(6).max(6),
//         key: joi.string().required(),
//         code: joi.string().required(),
//         countryCode: joi.string().optional(),

//     }).unknown(true)
//     let data =  await schema.validate(req.body, { abortEarly: false });

//     // return await validateSchema(req.body, schema,{abortEarly : false})
//      if (data.error) {
//       throw data.error
//     }
//     return false
// }
// //______________________________________________________________________

// const changePassword = async (req)=>{
//     try {
//         let schema = {};
//     schema = joi.object().keys({
//         oldPassword:joi.string().required(),
//         password:joi.string().required(),
//     })
//     // let data =  await schema.validate(req.body, { abortEarly: false });
//     return await validateSchema(req.body, schema,{abortEarly : false})
//     } catch (error) {
//        throw error
//     }
// }
// //______________________________________________________________________

// const updateProfile = async(req)=>{
//     try {
//         let schema = {};
//     schema = joi.object().keys({
//         firstName:joi.string().optional(),
//         lastName:joi.string().optional(),
//         phone:joi.string().optional(),
//         address:joi.string().optional(),
//         email:joi.string().optional(),
//     }).unknown(true)
//     // let data =  await schema.validate(req.body, { abortEarly: false });
//     return await validateSchema(req.body, schema,{abortEarly : false})
//     } catch (error) {
//        throw error
//     }
// }
// //______________________________________________________________________

// const setPassword = async(req)=>{
//     try {
//         let schema ;
//         schema = joi.object().keys({
//            password: joi.string().required(),
//         })
//     // let data =  await schema.validate(req.body, { abortEarly: false });
//         return await validateSchema(req.body,schema,{aboutEarly:false})
//     } catch (error) {
//        throw error
//     }
// }
// //______________________________________________________________________

// const forgtePassword = async(req)=>{
//     try{
//         let schema ;
//         schema = joi.object().keys({
//             // key: joi.string().optional(),
//            email: joi.string().optional(),
//            phone: joi.string().optional(),
//            countryCode: joi.string().optional(),

//         })
//         // return await schema.validate(req.body, { abortEarly: false });
//         return await validateSchema(req.body, schema ,{aboutEarly:false})
//     }catch (error) {
//        throw error
//     }

// }
// //______________________________________________________________________

// async function validateAddress(req){
//     let schema = joi.object().keys({
//         address:joi.string().optional(),
//         // key:joi.string().optional(),
//         latitude:joi.string().optional(),
//         longitude:joi.string().optional(),
//         country:joi.string().optional(),
//         state:joi.string().optional(),
//         city:joi.string().required(),
//         pinCode:joi.string().optional(),
//     }).unknown(false)
//     let data = await schema.validate(req.body,{aboutEarly:false})
//     if(data.error){
//         throw {message: data.error}
//     }
// }

// async function validateUpdateAddress(req){
//     let schema = joi.object().keys({
//         address:joi.string().optional(),
//         latitude:joi.string().optional(),
//         longitude:joi.string().optional(),
//         country:joi.string().optional(),
//         state:joi.string().optional(),
//         city:joi.string().optional(),
//         pinCode:joi.string().min(6).max(6).optional(),
//     }).unknown(false)
//     let data = await schema.validate(req.body,{aboutEarly:false})
//     if(data.error){
//         throw {message: data.error}
//     }
// }

// module.exports = {
//     validateSignup,validateLogin,validateVerifyOtp,
//     validateSocialLogin,updateProfile,changePassword,
//     validateVerifyOtp,setPassword,forgtePassword,
//     validateAddress,
//     validateUpdateAddress

// }
