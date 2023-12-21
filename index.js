const winston=require('winston')
const express=require('express');
const app=express();
require('./startup/routes')(app)
require('./startup/connect')()
require('./startup/logging')()
require('./startup/config')()
require('./startup/validation')()
// const movies=require('./routes/Movies')
// app.use(express.json());
// app.use('/api/movies',movies)
const port=process.env.PORT||3000
app.listen(port,()=>winston.info(`listening on ${port}`))