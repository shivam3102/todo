const { Todo } = require('../models/Todo')

const getTodoById = async (req, res, next, id) => {
    const todo = await Todo.findById(id).populate('user')
    if (todo) {
        req.todo = todo
        next()
    } else {
        res.status(400).json({ error: 'todo not found in db' })
    }
}

const getATodo = async (req, res) => {
    const todo = await Todo.findOne({ _id: req.todo._id }).populate('user')
    if (todo) {
        res.status(200).json(todo)
    } else {
        res.status(400).json({ error: 'todo not found' })
    }
}

const getTodos = async (req, res) => {
    const todos = await Todo.find({ user: { _id: req.profile._id } }).populate('user', '_id name')
    if (todos) {
        res.status(200).json(todos)
    } else {
        res.status(400).json({ error: 'todos not found' })
    }
}

const createTodo = async (req, res) => {
    req.body.user = req.profile
    const newTodo = new Todo(req.body)
    const todo = await newTodo.save()
    if (todo) {
        res.status(200).json(todo)
    } else {
        res.status(400).json({ error: 'failed to create a todo' })
    }
}

const updateTodo = async (req, res) => {
    const todo = await Todo.findByIdAndUpdate({ _id: req.todo._id }, { $set: req.body }, { new: true, useFindAndModify: false })
    if (todo) {
        res.status(200).json(todo)
    } else {
        res.status(400).json({ error: 'failed to update a todo' })
    }
}

const deleteTodo = async (req, res) =>{
    const todo = await Todo.findByIdAndDelete({ _id: req.todo._id})
    if(todo){
        res.status(200).json(todo)
    }else{
        res.status(400).json({ error: 'failed to delete todo'})
    }
}

module.exports = {
    createTodo,
    getATodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}