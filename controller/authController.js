const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');// # to generate the token
const bcrypt = require('bcryptjs');// # to encrypt the data
const config = require('../config');// # to secret token
const User = require('../model/userModel');// # defined schema for users
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());// # cors
// get all users from collections
router.get('/users', (req, res) => {
    User.find({}, (err, user) => {
        if (err) throw err;
        res.send(user);
    })
})
router.post('/register', (req, res) => {
    // password encryption

    let encryptedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
        phone: req.body.phone,
        role: req.body.role ? req.body.role : 'User'
    }, (err, data) => {
        if (err) return res.status(500).send('Error While Register');
        res.status(200).send('Registration Successful');
    })

})
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.send({ auth: false, token: "Error while connection" });
        if (!user) return res.send({ auth: false, token: "No user is found Register first" });
        else {
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passIsValid)
                return res.send({ auth: false, token: "Invalid password" });
            // password correct 
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })// 24 hours
            return res.send({ auth: true, token: token });
        }
    })
})
router.get('/getInfo', (req, res) => {
    let token = req.header("x-access-token");
    if (!token) res.send({ auth: false, token: "No token is found" });
    // JWT verifying
    jwt.verify(token, config.secret, (err, user) => {
        if (err) return res.send({ auth: false, token: "invalid token" })
        User.findById(user.id, (err, result) => {
            res.send(result);
        })
    })
})
module.exports = router;
