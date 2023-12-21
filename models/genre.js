const mongoose=require('mongoose')
const Joi=require('joi')
//using database object instead of genres array
const genreschema=mongoose.Schema({
    type:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200
    }
})
const genresModel=mongoose.model('Genre',genreschema);
function validateerror(validationObj){
    const schema=Joi.object({
        type:Joi.string().min(5).required()
     })
     const response=schema.validate(validationObj);
     return response
}
module.exports.Genre=genresModel,
module.exports.validate=validateerror
module.exports.genreSchema=genreschema