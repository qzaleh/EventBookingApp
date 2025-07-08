const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            return res.json({
                error: 'Could not hash the password'
            });
        }

        let user = new User({
            name: req.body.name,
            bookedEvent: req.body.bookedEvent,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            password: hashedPass
        });

        user.save()
            .then(user => {
                res.json({
                    message: 'User registered successfully'
                });
            })
            .catch(error => {
                res.json({
                    error: 'An error occurred while saving the user'
                });
            });
    });
};

const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.json({
                            error: err
                        });
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' });
                        res.json({
                            message: 'Login Successful!',
                            token
                        });
                    } else {
                        res.json({
                            message: 'Password does not match'
                        });
                    }
                });
            } else {
                res.json({
                    message: 'No user found!'
                });
            }
        })
        .catch(error => {
            res.json({
                error: 'An error occurred while finding the user'
            });
        });
};

module.exports = {
    register,
    login
};
