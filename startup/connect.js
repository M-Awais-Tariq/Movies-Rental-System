const mongoose=require('mongoose')
module.exports=function(){
mongoose.connect('mongodb://127.0.0.1:27017/vidly',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
.then(()=>console.log('Connected to db successfully'))
.catch((err)=>console.log(err.message,'Doesnt connected to db '))

}