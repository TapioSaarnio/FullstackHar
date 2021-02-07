const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', (request, response) => {

    User.find({}).then(u => {
        response.json(u.map(u => u.toJSON()))
    })
})

usersRouter.get('/:id', (request, response, next) => {

    User.findById(request.params.id).then(u => {
        if(u) {
        response.json(u => u.toJSON())
        }
        response.status(404).end()
    }).catch(error => next(errorr))
})

usersRouter.post('/', async (request, response, next) => {

    console.log('uiserspost')

    try{

    
        const body = request.body
    
        console.log('body')
        console.log(body)
        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
        const user = new User({
          username: body.username,
          passwordHash
        })
    
        const savedUser = await user.save()
    
        response.json(savedUser)
    
      } catch (error) {
        next(error)
      }

    
})

module.exports = usersRouter