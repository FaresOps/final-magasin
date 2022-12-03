const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();




router.post('/add', async (req, res) => {
    let category = new Category({
        name: req.body.name,
    })
    category = await category.save();
    res.send(category);
    if (!category)
        return res.status(404).send('the categorie cannot be created!')
})
router.delete('/delete/:id', async (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(Category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'the categories is deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'categories not found' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})
router.get('/list', async (req, res) => {
    const categorieList = await Category.find();

    if (!categorieList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(categorieList);
})
router.put('/update/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        { new: true }
    )

    if (!category)
        return res.status(404).send('the categorie cannot be created!')
    res.send(category);
})
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({
            success: false
        })
    }
    res.status(200).send(category);
})


module.exports = router;