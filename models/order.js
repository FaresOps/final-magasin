const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
});



exports.Order = mongoose.model('Order', orderSchema);