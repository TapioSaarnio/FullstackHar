const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({

    content: {
        type: String,
        required: true,
        minlength: 20
    },
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review