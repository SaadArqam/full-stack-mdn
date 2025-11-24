const express=require('express')
const route=express.Router()
const {addBook,showBook}=require('./bookController')

route.post('/add',addBook)
route.get('/',showBook)


module.exports=route