const mongoose=require('mongoose')
const Joi=require('joi')
const config=require('config')
const jwt=require('jsonwebtoken')

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:200
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1020
    },
    isAdmin:Boolean
})
userschema.methods.generateAuthToken=function(){
    const token=jwt.sign({ _id:this._id,isAdmin:this.isAdmin},config.get('jwtprivatekey'))
    return token
}
const userModel=mongoose.model('User',userschema)
function validateuser(user){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(5).required(),
        isAdmin:Joi.boolean()
    })
    const validate=schema.validate(user)
    return validate
}
module.exports.User=userModel;
module.exports.validateuser=validateuser