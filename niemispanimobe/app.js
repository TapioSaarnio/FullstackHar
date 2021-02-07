const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const multer = require('multer')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: 5 * 1024 * 1024,
    },
})

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(express.static('build'))
  app.use(express.json())
  app.disable('x-powered-by')
app.use(multerMid.single('file'))

  app.use('/api/users', usersRouter)
  app.use('/api/products', productsRouter)


  module.exports = app