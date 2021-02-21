const reviewsRouter = require('express').Router()
const Review = require('../models/review')
const User = require('../models/user')
const Product = require('../models/product')

reviewsRouter.post('/', async (request, response, next) => {

    console.log('reviewspost')

    try {

        const body = request.body
        console.log('bodyuser')
        console.log(body.user)
        const user = await User.findOne({username: body.user.username})
        const product = await Product.findOne({name: body.product.name})


        const review = new Review({

            description: body.description,
            rating: body.rating,
            user: user._id,
            product: product._id


        })

        const savedReview = await review.save()

        console.log('savedreview')
        console.log(savedReview)

        user.reviews = user.reviews.concat(savedReview._id)
        product.reviews = product.reviews.concat(savedReview._id)
        await product.save()
        await user.save()

        response.json(savedReview.toJSON())


    } catch (error) {
        next(error)
    }

})

module.exports = reviewsRouter