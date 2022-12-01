const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: {
        type: String,
    },
    categorie: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    image: {
        type: String,
    },
    stockMin: {
        type: Number,
    },
})

exports.Product = mongoose.model('Product', productSchema);