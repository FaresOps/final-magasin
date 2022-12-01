const { Order } = require('../models/order');
const express = require('express');
// const { OrderItem } = require('../models/order-items');
const router = express.Router();



router.get('/list', async (req, res) => {
    const orderList = await Order.find();
    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
})
router.post('/create', async (req, res) => {
    // const orderItemsIds = Promise.all(req.body.orderItems.map(async orderitem => {
    //     let newOrderItem = new OrderItem({
    //         quantity: orderitem.quantity,
    //         product: orderitem.product
    //     })
    //     newOrderItem = await newOrderItem.save();

    //     return newOrderItem._id;
    // }))
    // const orderItemsIdsResolved = await orderItemsIds;
    try {
        let order = new Order({
            name: req.body.name,
            lastName: req.body.lastName,
            orderItems: req.body.orderItems,
            classe: req.body.classe,
            status: req.body.status
        })
        order = await order.save()
        res.send(order);
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;