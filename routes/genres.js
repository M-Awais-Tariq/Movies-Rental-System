const express=require('express')
const routes =express.Router()
const {Genre,validate}=require('../models/genre')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
// const asyncMiddleware=require('../middleware/async')
//routes.get is used to handle read request from the client  
// asyncMiddleware() we dont need to use this function if express-async-errors
//is working because this package can automatically calls the async module
routes.get('/',async(req,res,)=>{
    //  throw new Error('Could not find genres')
    const genres =await Genre.find().sort({type:1});
    res.send(genres);

})

routes.get('/:id',async (req,res)=>{
   const genre=await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send("The genre with the crossponding id is not found")
    res.send(genre);

})
//routes.post is used to handle create request from the server 
routes.post('/',auth,async (req,res)=>{
 
 const response=validate(req.body);
 if(response.error)
 return res.status(404).send(response.error.details[0].message)
 else{
    
    let genre=new Genre({
        type:req.body.type
      })
    await genre.save()
    res.send(genre)  
}
})
//response.put is used to handle the  update request from  the server
routes.put('/:id',auth,async (req,res)=>{
    const response=validate(req.body);
    if(response.error){
        res.status(404).send(response.error.details[0].message)
    }
    else{
        const genre=await Genre.findByIdAndUpdate(req.params.id,{type:req.body.type},
        {new:true})
        if(!genre){res.send("The genre with the crossponding id is not found")}
        else
        res.send(genre)
    }
})
routes.delete('/:id',[auth,admin],async (req,res)=>{
         const genre=await Genre.findOneAndRemove(req.params.id)
        if(!genre){res.send("The genre with the crossponding id is not found")}
         res.send(genre)
    
})

module.exports=routes;