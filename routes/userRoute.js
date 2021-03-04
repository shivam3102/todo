const route = require('express').Router()

const { getUserById, getUser, createCount } = require('../controllers/user')
const { isAuthenticated, isSignin } = require('../controllers/auth')

route.param('id', getUserById)

route.get('/user/:id', isSignin, isAuthenticated, getUser)
route.put('/user/count/:id', isSignin, isAuthenticated, createCount)

module.exports = route