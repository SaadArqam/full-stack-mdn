const express=require('express');
const app=express()
require('dotenv').config();
const bookRoutes=require('./books/bookRoutes')
app.use(express.json())
app.use('/book',bookRoutes)



app.listen(process.env.PORT||3000,()=>{
    console.log('server running!!!')
})