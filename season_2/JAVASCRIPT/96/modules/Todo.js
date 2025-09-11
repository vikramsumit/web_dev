import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  Title: String,
  desc: String,
  date: { type: Date, default: Date.now },
  isCompleted: Boolean
});

export const Todo = mongoose.model('Todo', TodoSchema);