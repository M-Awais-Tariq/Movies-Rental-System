const express=require('express')
const router=express.Router()
const {Rental,validaterental}=require('../models/rental')
const {Customer}=require('../models/customer')
const {Movies}=require('../models/movie')
router.get('/',async(req,res)=>{
    const rentals=await Rental.find();
    res.send(rentals)
})
router.get('/:id',async (req,res)=>{
    const rental=await Rental.findById(req.params.id)
    res.send(rental)
})
router.post('/', async (req,res)=>{
const result= validaterental(req.body);
if(result.error) return res.status(400).send(result.error.details[0].message)
const  customer=await Customer.findById(req.body.customerid)
if(!customer) return res.status(400).send("Invalid customer")
console.log(customer)
const movie=await Movies.findById(req.body.movieid)
if(!movie) return res.status(400).send("Invalid movie")
if(movie.numberInStock===0) return res.send("No movie in stock")
let rental= new Rental({
    customer:{
        _id:customer._id,
        name:customer.name,
        phone:customer.phone
    },
    movie:{
        _id:movie._id,
        title:movie.title,
        dailyRentalRate:movie.dailyRentalRate
    },
})
await rental.save();
movie.numberInStock--
movie.save()
res.send(rental)
})
router.put('/:id', async (req,res)=>{
    // const {result,error}= validaterental(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    // let rental=await Rental.findById(req.params.id);
    // rental.customer.name=req.body.customer.name
    // rental.customer.phone=req.body.customer.phone
    // rental.movie.title=req.body.movie.title
    // rental.movie.dailyRentalRate=req.body.movie.dailyRentalRate
    // rental.dateout=req.body.dateout;
    // rental.dateReturned=req.body.dateReturned
    // rental=rental.save();
    const  rental=await Rental.findByIdAndUpdate(req.params.id,{
        $set:{
     "customer.name":req.body.customer.name,
     "customer.phone":req.body.customer.phone,
     "movie.title":req.body.movie.title,
     "movie.dailyRentalRate":req.body.movie.dailyRentalRate,
     "dateout":req.body.dateout,
     "dateReturned":req.body.dateReturned
        }
    },
        {new:true}
    )
    res.send(rental)
})
router.delete('/:id',async (req,res)=>{
    let  rental=await Rental.findByIdAndDelete(req.params.id)
    res.send(rental)

})
module.exports=router