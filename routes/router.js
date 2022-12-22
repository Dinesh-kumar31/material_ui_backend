const e = require('express')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const rounds = 10;
const tokenSecret = 'test-token'
const jwt = require('jsonwebtoken')
const User = require('../model/user').user
const Shop = require('../model/shopdata').shop

generateToken = (user) => {
    const data = {
        email: user.email,
        password: user.password
    }
    return jwt.sign({data}, tokenSecret,{})
}

/*
** Before Login
*/ 

router.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(403).json({error: 'No user found'})
            }else{
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        res.status(500).json(error)
                    }else if(match){
                        res.status(200).json({
                            data: {
                                email: match.email,
                                firstName: match.firstName,
                                lastName: match.lastName,
                                password: match.password,
                                role: match.role,
                                _id: match._id
                            },
                            resCode: '200',
                            token: generateToken(user)
                        })
                    }else{
                        res.status(403).json({error: 'passwords do not match'})
                    }
                })
            }
        }).catch(error => {
            res.status(500).json(error)
        })
})

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) {
            res.status(500).json(error)
        }else{
            const userData = req.body;
            userData.password = hash;
            userData.backup = req.body.password
            const user = new User(userData)
            user.save((error, registerUser) => {
                if (error) {
                    console.log(error)
                }else{
                    res.status(200).send({data: registerUser,resCode: '200'})
                }
            })
        }
    })    
})


/*
** Before Login
*/ 

router.post('/addshop', (req, res) => {
    const reqBody = req.body;
    const shop = new Shop(reqBody)
    shop.save((err, shopdata) => {
        if (err) {
            res.status(500).json(err)
        }else{
            res.status(200).send({data: shopdata})
        }
    })
})

module.exports = router