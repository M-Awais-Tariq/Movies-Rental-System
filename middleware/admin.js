module.exports=function(req,res,next){
    //the admin function is exectued right after the auth function
    //hence once a user is authenticated then it will be verified it is a 
    //admin or not
    if(!req.user.isAdmin) return res.status(403).send("Access Denied")
    next()
    //403 forbidden
    //401 bad request
}