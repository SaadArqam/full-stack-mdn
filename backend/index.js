const express=require('express');
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('Hello')
})

app.listen(process.env.PORT,()=>{
    console.log('server running!!!')
})