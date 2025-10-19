import express from 'express' 
 const app= express()
 
 import dotenv from 'dotenv'
dotenv.config();
import connectdb from './Src/DB/index.js';
connectdb()
 
 app.get('/',(req,res)=>{
   res.send('hello todo api')
 })
 app.listen(process.env.PORT ||9000,()=>{
   console.log(`Server is ready at ${process.env.PORT }`)
 })