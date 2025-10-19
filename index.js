import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config();
import connectdb from './Src/DB/index.js';
import Todo from './Src/models/todo.models.js'


app.get('/', (req, res) => {
  res.send('hello todo api')
})

app.use(express.json()) ;

connectdb()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT || 9000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });


app.get('/api/todos',async(req,res) => {
     try {
       const alltodos= await Todo.find({})
       res.status(200).json(alltodos)
        
     } catch (error) {
      res.status(500).json({message:error.message})
     }
})




app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body)
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
