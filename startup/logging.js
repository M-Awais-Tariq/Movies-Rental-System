require('express-async-errors')
//this module automatically calls the async module
const winston=require('winston')
//winston is a package to logging errors
require('winston-mongodb')

module.exports=function(){
    //to handle uncaught exceptiones
 process.on('uncaughtException',(ex)=>{
    console.log('we got an uncaught exception')
    winston.error(ex.message)
})
// winston.exceptions.handle(new winston.transports.File(
//     {filename:'unhandlexception.log'}))
// winston.add(new winston.transports.File({filename:'logfie.log' ,handleExceptions:true}))
winston.add(new winston.transports.Console())
//to log errors onto mongodb
//  winston.add(new winston.transports.MongoDB(
//      {db:'mongodb://127.0.0.1:27017/',
//      level:'error',
//      useNewUrlParser: true,
//      useUnifiedTopology: true
//  }))
//  throw new Error("App crashed")
}