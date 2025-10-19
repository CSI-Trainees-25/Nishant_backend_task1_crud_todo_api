import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config();
import connectdb from './Src/DB/index.js';
import Todo from './Src/models/todo.models.js'


app.get('/', (req, res) => {
  res.send('hello todo api')
})

app.use(express.json());

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


app.get('/api/todos', async (req, res) => {
  try {
    const alltodos = await Todo.find({})
    res.status(200).json(alltodos)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/todo/:id', async (req, res) => {
  try {
    const { id } = req.params
    const singletodos = await Todo.findById(id)

    if (!singletodos) {
      return res.status(404).json({ message: "Todo not found" })
    }
    res.status(200).json(singletodos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});



app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body)
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatetodos = await Todo.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatetodos) {
      return res.status(404).json({ message: "Todo not found" })
    }
    res.status(200).json(updatetodos)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

