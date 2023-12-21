const Joi =require('joi');
module.exports=function(){
    Joi.objectId=require('joi-objectid')(Joi)
//joi-objectid returns a function and Joi is send as a reference to this 
//function and stores this function in Joi.objectId

}