const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    try {
        let user = new User({
            cin: req.body.cin,
            name: req.body.name,
            lastName: req.body.lastName,
            classe: req.body.classe,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            isAdmin: req.body.isAdmin
        });
        await user.save()
        res.send('save etudiant effectué avec succes!');
    } catch (err) {
        console.log(err);
    }
});

router.get('/list', async (req, res) => {
    const userList = await User.find().select('-password');

    if (!userList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(userList);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(500).json({
            success: false
        })
    }
    res.status(200).send(user);
})
// router.post('/login', async (req, res) => {
//     const user = await User.findOne()
//     if (!user) {
//         return res.status(400).send('the user not found')
//     }
//     if (user && bcrypt.compareSync(req.body.password, user.password)) {
//         res.status(200).send('user Authenticated');
//     } else {
//         res.status(400).send('password is wrong!! ');
//     }
// })

module.exports = router;