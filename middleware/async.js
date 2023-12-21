//this function is simply running the route handler using try catch
module.exports=function asyncMiddleware(handler){
    return async function(req,res,next){
    try
    {
        await handler(req,res)
    }
    catch(ex){
        next(ex)
        
    }
}
}
//  route handler functiones are the functiones that are called by express module

//now when we define another function that calls the route handler function we
//have to give the req,res,next arguments to that function but this we cannot do
//So to solve this problem we define another route handler function and return it
//now this function will be called by express
