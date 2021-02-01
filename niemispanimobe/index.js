require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const {Storage} = require('@google-cloud/storage')
const {uploadImage} = require('./helpers/helpers')
const Product = require('./models/product')
const cors = require('cors')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')


const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
})

app.use(cors())
app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)


/*
app.get('/Tuotteet', async (req, res, next) => {

  console.log('tuotteet')

  const products = await Product.find({})

  console.log('products')
  console.log(products)

  res.status(200).json({
    products
  }
  )


})


  app.post('/beerUploads', async  (req, res, next) => {



    
    if (req.name === undefined || req.description === undefined || req.type === undefined || req.file === undefined) {
      console.log('if lohko')
      return response.status(400).json({error: 'content missing' })
      const gc = new Storage({
  keyFilename: process.env.SERVICEKEY,
  projectId: 'sonic-progress-302121'
  console.log('getbuckets')
gc.getBuckets().then(x => console.log(x))
console.log('saikobuckes')

})
    }
    

    try {

      const pictureFile = req.file
      const imageUrl = await uploadImage(pictureFile)

      const product = new Product({
      
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        image: imageUrl
      })
      
      const savedProduct = await product.save()


      res
      .status(200)
      .json({
        message: "Upload was successful",
        data: savedProduct
      })

      
      product.save().then(savedProduct => {
        res.json(savedProduct)
      })
      

    } catch (error) {
      next(error)
    }

  })


  app.post('/users', async (request, response, next) => {

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
*/

  app.use((err, req, res, next) => {
    res.status(500).json({
      error: err,
      message: 'Internal server error!',
    })
    next()
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running from port ${PORT}`)
})