const mongoose = require('mongoose')

   const productSchema = new mongoose.Schema({

    name: String,
    description: String,
    type: String,
    image: String,
    reviews: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }]

   })

   const Product = mongoose.model('Product', productSchema)

   module.exports = Product