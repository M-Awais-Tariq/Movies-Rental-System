const express=require('express');
const router=express.Router();
const {User}=require('../models/user');
const bcrypt=require('bcrypt')
const Joi=require('joi')

router.post('/',async(req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let  user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Invalid email")
    const validpswd=await bcrypt.compare(req.body.password,user.password)
    if(!validpswd) return res.status(400).send("Invalid  password")
    const token=user.generateAuthToken()
    res.send(token)
})
function validate(user){
    const schema=Joi.object({
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(5).required()
    })
    const validate=schema.validate(user)
    return validate
}
module.exports=router