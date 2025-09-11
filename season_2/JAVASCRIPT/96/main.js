// https://www.npmjs.com/package/mongodb
// mongoosejs.com

import mongoose from "mongoose";
import express from "express";
import { Todo } from "./modules/Todo.js";

// mongoose is a ODM (Object Data Modeling) library for MongoDB and Node.js
// It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

// Connecting to MongoDB
let conn = await mongoose.connect("mongodb://localhost:27017/todo");

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const todo = new Todo({ Title: 'Buy groceries', desc: 'Milk, Bread, Eggs', isCompleted: false });
    todo.save().then(() => console.log('Todo item saved to database'));
    res.send('Hello World!')
})

app.get('/a', (req, res) => {
    let todo = Todo.find().then((data) => {
        console.log(data);
        res.send(data);
    });
});

app.get('/h', async (req, res) => {
    let todo = await Todo.findOne({})
    res.json({title: todo.Title, desc: todo.desc, date: todo.date, isCompleted: todo.isCompleted});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
