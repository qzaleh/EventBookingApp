const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    
    name: {
        type: String
    },
    bookedEvent: {
        type: String

    },
    email:{
        type: String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    },
    password:{
        type:String
    }
},{timestamps: true})

const User = mongoose.model('User',userSchema)
module.exports = User

