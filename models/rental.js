const mongoose=require('mongoose');
const Joi =require('joi');

const { validate } = require('./customer');
const rental= mongoose.model('Rental',new mongoose.Schema({
customer:{
    type:new mongoose.Schema({
        name:{
            type:String,
            required:true,
            minlenght:5,
            maxlangth:50
        },
        isGold:{
            type:Boolean,
            default:false
        },
        phone:{
            type:String,
            required:true,
            minlength:11,
            maxlength:20
        }
    }),
    required:true
},
movie:{
type:new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        
    },
}),
required:true
},
dateout:{
    type:Date,
    required:true,
    default:Date.now
},
dateReturned:{
    type:Date
},
rentalfee:{
    type:Number,
    min:0
}
}))
function validaterental(rental){
    const schema=Joi.object({
        customerid:Joi.objectId().required(),
        movieid:Joi.objectId().required()
    })
    const result=schema.validate(rental)
    return result
}
module.exports.Rental=rental;
module.exports.validaterental=validaterental