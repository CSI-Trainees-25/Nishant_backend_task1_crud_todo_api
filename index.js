import express from "express" 
import mongoose from "mongoose"
import product from "./Src/Models/product.models.js";
const app = express() 
const port =4000

app.use(express.json()) ;


app.get('/', (req, res) => {
  res.send('Hello World! nishant')
})


app.get('/', async(req, res) => {
 try {
  const products=  await product.find({})
     res.status(200).json(products);
 } catch (error) {
     res.status(500).json({message: error.message})
 }
})
app.post("/api/products", async (req,res) => {
   try {
    const product =  await product.create(req.body);
    res.status(200).json(product);
   } catch (error) {
    res.status(500).json({message: error.message})
   }

})




mongoose.connect("mongodb+srv://nikkisinghnishant_db_user:nishant123a@nishant.2z6fume.mongodb.net")
.then(() => {
  console.log("database is connected !!!");

  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})
.catch((error) => {
  console.error("connection failed", error);
});
