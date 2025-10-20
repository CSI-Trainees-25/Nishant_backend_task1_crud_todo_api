import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"pls enter the title"] 
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    },
    createdBy: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const Todo = mongoose.model("Todo", todoSchema);
export default Todo