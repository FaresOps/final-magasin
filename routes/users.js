const { User } = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        let user = new User({
            cin: req.body.cin,
            name: req.body.name,
            lastName: req.body.lastName,
            classe: req.body.classe,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            isAdmin: req.body.isAdmin
        });
        await user.save()
        res.send('save etudiant effectué avec succes!');
    } catch (err) {
        console.log(err);
    }
});

router.get('/list', async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(userList);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(500).json({
            success: false
        })
    }
    res.status(200).send(user);
})


module.exports = router;