//const { response } = require('express')
const User = require('../models/User')


const index = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}
//single user
const show = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}
//sign in
const store = (req, res, next) => {
    let user = new User({
        name: req.body.name,
        bookedEvent: req.body.bookedEvent,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password
    })
    user.save()
    .then(response =>{
        res.json({
            message: 'User added successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}
//update user
const update = (req, res, next) => {
    let userID = req.body.userID
//replacements
    let updatedData = {
        name: req.body.name,
        bookedEvent: req.body.bookedEvent,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password
    }

    User.findByIdAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'User data updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}
//delete user
const terminate = (req, res, next) => {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
    .then(() => {
        req.json({
            message: 'User deleted successfully!'
        })
    })
    .catch(error => {
        req.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, store, update, terminate
}

