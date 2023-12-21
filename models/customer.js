const mongoose=require('mongoose')
const Joi=require('joi')
//using database object instead of Customers array

const customerschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200
    },
    isGold:{
        type:Boolean,
        default:false,
    },
    phone:{
        type:String,
        required:true,
        minlength:11,
        maxlength:15,
    }
})
const CustomerModel=mongoose.model('Customer',customerschema);
function validateerror(validationObj){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
        phone:Joi.string().min(11).required(),
        isGold:Joi.boolean()


    })
     const response=schema.validate(validationObj);
     return response
}
module.exports.Customer=CustomerModel
module.exports.validate=validateerror