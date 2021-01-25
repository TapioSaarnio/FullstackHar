require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const {Storage} = require('@google-cloud/storage')
const {uploadImage} = require('./helpers/helpers')
const Product = require('./models/product')

const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
})

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.get('./Tuotteet', async (req, res, next) => {

  const products = await Product.find({})

  res.status(200).json({
    data: products
  }
  )


})




  app.post('/beerUploads', async  (req, res, next) => {

    console.log('beeruploads')



    /*
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
    */

    console.log('toimii viel')


    try {

      const pictureFile = req.file
      console.log(pictureFile)
      const imageUrl = await uploadImage(pictureFile)
      console.log('imageurl')
      console.log(imageUrl)

      console.log('req')
      console.log(req)

      const product = new Product({
      
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        image: imageUrl
      })

      console.log(product)
      
      const savedProduct = await product.save()
      console.log('savedproduct')
      console.log(savedProduct)

      res
      .status(200)
      .json({
        message: "Upload was successful",
        data: savedProduct
      })

      
      


      /*
      product.save().then(savedProduct => {
        res.json(savedProduct)
      })
      */

    } catch (error) {
      next(error)
    }


    

  })

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