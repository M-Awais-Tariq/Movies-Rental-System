const {Movies,validateMovie}=require('../models/movie');
const express=require('express')
const router=express.Router();
const {Genre}=require('../models/genre');


router.get('/', async(req,res)=>{
const movies=await Movies.find()
res.send(movies)
})
router.get('/:id', async(req,res)=>{ 
    const movie=await Movies.find({_id:req.params.id})
    if(!movies)
    return res.status(404).send("the movie with the crossponding id is not found")
    res.send(movie)
    })
router.post('/',async (req,res)=>{
    const response =validateMovie(req.body)
    if(response.error){
        res.status(350).send(response.error.details[0].message)
    }
    else{
        const genre=await Genre.findById(req.body.genreID)
        if(!genre) return res.status(404).send("Invalid Genre ID")
        const movie=new Movies({
          title:req.body.title,
          genre:{
            _id:genre._id,
            type:genre.type
          },
          numberInStock:req.body.numberInStock,
          dailyRentalRate:req.body.dailyRentalRate    
        })
        await movie.save()
        res.send(movie)

    }
})
router.put('/:id',async (req,res)=>{
    const response=validateMovie(req.body)
    if(response.error)
    return res.status(350).send(response.error.details[0].message)
    const genre=await Genre.findById(req.body.genreID)
    if(!genre) return res.status(404).send("Invalid Genre ID")
    const movie =await Movies.findByIdAndUpdate(req.params.id,
    {
        $set:{
            'title':req.body.title,
            'genre._id':genre._id,
            'genre._type':genre._type,
            'numberInStock':req.body.numberInStock,
            'dailyRentalRate':req.body.dailyRentalRate   
        }
    },
    {
        new:true
    })
    res.send(movie)
})    
router.delete('/:id',async (req,res)=>
{
    const movie =await Movies.findByIdAndDelete(req.params.id)
    res.send(movie)
})
module.exports=router;