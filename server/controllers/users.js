const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios')
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
    
module.exports = {
    register: (req, res) => { 
        User.create({
            name: req.body.name,
            email: req.body.email,
            img: req.body.img,
            password: req.body.password
        })
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .then((result) => {
            if(!result){
                res.status( 400 ).json({
                    msg: 'User not found!'
                })
            }
            let valid = bcrypt.compareSync(req.body.password, result.password)
            if (valid){
                jwt.sign({
                    id: result._id,
                    name: result.name,
                    email: result.email
                }, process.env.JWT, (err, token) => {
                    if(err){
                        res.status( 400 ).json({
                            msg : 'JWT error'
                        })
                    } else {
                        res.status( 200 ).json({
                            msg : 'Login Success',
                            token : token
                        })
                    }
                })
            } else {
                res.status(403).json({
                    msg : "Wrong Password",
                    err : err
                });
            }
        })  
        .catch((err) => {            
            res.status(500).json({msg: 'login gagal', err: err})
        });
    },
    update: (req, res) => {
        User.updateOne({
            _id : req.params.id
        },{ $set: {
            name : req.body.name,
            email : req.body.email,
        }})
        .then(result=>{
            res.status(200).json({
            msg : `success updating user`,
            result : result
            })
        })
        .catch(err=>{
            res.status(500).json({
            msg : "failed updating user",
            err : err
            });
        });
    },
    getUser: (req, res) => {
        res.status(200).json( req.decoded )
    },
    loginGoogle: (req, res) => {        
        axios({
            method: 'GET',
            url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.token}`
        })
        .then((result) => {
            console.log(result.data);
            User.findOne({
                email: result.data.email
            })
            .then((user) => {
                console.log(user);
                
                if(!user){
                    User.create({
                        name: result.data.name,
                        email: result.data.email,
                        password: process.env.PW_GOOGLE,
                        isGoogle: 1
                    })
                    .then((newUser) => {
                        console.log(newUser);
                        jwt.sign({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email
                        }, process.env.JWT, (err, token) => {
                            if(err){
                        res.status( 400 ).json({
                            msg : 'JWT error'
                        })
                            } else {
                                res.status( 200 ).json({
                                    msg : 'Login Success',
                                    token : token
                                })
                            }}) 
                        })
                    .catch((err) => {
                        res.status(500).json({err})
                    });
                } else {
                    jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }, process.env.JWT, (err, token) => {
                        if(err){
                            res.status( 400 ).json({
                                msg : 'JWT error'
                            })
                        } else {
                            res.status( 200 ).json({
                                msg : 'Login Success',
                                token : token
                            })
                        }
                    })   
                .catch((err) => {
                    res.status(500).json({err})
                });
                }
            })
        }).catch((err) => {
            res.status(500).json({msg: 'login gagal', err: err})
        });
    }

}