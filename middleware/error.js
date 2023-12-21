const winston =require('winston')
module.exports=function(err,req,res,next){
    winston.log('error',err.message)//to log errors
   //as a first argument we set logging level to describe the nature 
//    of errors
// error
// info
// warn
// debug
// silly
// verbose
    res.status(500).send("something  goes wrong")
}