const productsRouter = Router()
const Product = require('../models/product')


productsRouter.get('/', (request, response) => {
    Product.find({}).then(ps => {
        response.json(ps.map(p => p.toJSON()))
    })
})

productsRouter.get('/:id', (request, response, next) => {

    Product.findById(request.params.id)
        .then(p => {
            if(p) {
                response.json(p.toJSON())
            }
            response.status(404).end()
        })
          .catch(error => next(error))


})

productsRouter.post('/', async (req, res, next) => {

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
  
        /*
        product.save().then(savedProduct => {
          res.json(savedProduct)
        })
        */
  
      } catch (error) {
        next(error)
      }
    
})

module.exports = productsRouter