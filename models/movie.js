const Joi =require('joi');
const mongoose=require('mongoose')
const {genreSchema}=require('./genre')
const movieSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30,
        trim:true
    },
    genre:
    {
        type:genreSchema,
        required:true
    },
    numberInStock:
    {
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:
    {
        type:Number,
        required:true,
        min:0,
        max:255
    }

})
const Movies=mongoose.model('Movie',movieSchema)
function validateMovie(validationobj){
    const schema=Joi.object({
   title:Joi.string().min(3).required(),
   genreID:Joi.objectId().required(),
   numberInStock:Joi.number().min(0).required(),
   dailyRentalRate:Joi.number().min(0).required()
    })
    const result=schema.validate(validationobj)
    return result;
}
module.exports.Movies=Movies;
module.exports.validateMovie=validateMovie