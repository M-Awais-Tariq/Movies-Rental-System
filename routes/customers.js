const express=require('express')
const routes =express.Router()
const {Customer,validate}=require('../models/customer')
//routes.get is used to handle read request from the client  
routes.get('/',async(req,res)=>{
const Customers =await Customer.find().sort({type:1});
         res.send(Customers);
})

routes.get('/:id',async (req,res)=>{
   const customer=await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("The Customer with the crossponding id is not found")
    res.send(customer);

})
//routes.post is used to handle create request from the server 
routes.post('/',async (req,res)=>{
 const response=validate(req.body);
 if(response.error)
 return res.status(404).send(response.error.details[0].message)
 else{
    
      let customer=new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold,
      })
    await customer.save()
    res.send(customer)  
}
})
//response.put is used to handle the  update request from  the server
routes.put('/:id',async (req,res)=>{
    const response=validate(req.body);
    if(response.error){
        res.status(404).send(response.error.details[0].message)
    }
    else{
        const customer=await Customer.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold,
    },
        {new:true})
        if(!customer){res.send("The Customer with the crossponding id is not found")}
        else
        res.send(customer)
    }
})
routes.delete('/:id',async (req,res)=>{
         const customer=await Customer.findByIdAndRemove(req.params.id)
        if(!customer){res.send("The Customer with the crossponding id is not found")}
         res.send(customer)
    
})

module.exports=routes;