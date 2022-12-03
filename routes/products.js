const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');




router.post('/create', async (req, res) => {
    const category = await Category.findById(req.body.categorie)
    if (!category) return res.status(400).send('invalid Categories')
    try {
        let product = new Product({
            name: req.body.name,
            categorie: req.body.categorie,
            description: req.body.description,
            countInStock: req.body.countInStock,
            image: req.body.image,
            stockMin: req.body.stockMin,
            featured: req.body.feadtured
        });
        product = await product.save()
        res.send('save effectué avec succes!');
    } catch (err) {
        console.log(err);
    }
});
router.get('/list', async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});
router.get('/:id', async (req, res) => {
    const productList = await Product.findById(req.params.id);
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});
router.put('/update/:id', async (req, res) => {
    // validation de l'ID
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id')
    }
    const categorie = await Categorie.findById(req.body.categorie)
    if (!categorie) return res.status(400).send('invalid Categories')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            id: req.body.id,
            name: req.body.name,
            categorie: req.body.categorie,
            description: req.body.description,
            countInStock: req.body.countInStock,
            image: req.body.image,
            stockMin: req.body.stockMin,
            featured: req.body.feadtured
        },
        { new: true }
    )

    if (!product)
        return res.status(404).send('the categorie cannot be created!')
    res.send(product);
});
router.delete('/delete/:id', async (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the categories is deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'categories not found' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})


module.exports = router;