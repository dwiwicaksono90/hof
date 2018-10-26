const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

var userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name not null']
    },
    email : {
        type: String,
        unique: [true, 'Email was already exist'],
        required: [true, 'Email not null']
    },
    password : {
        type: String,
        minlength: [5, 'Password Min 5 Caracters'],
        required: [true, 'Password not null']
    },
    img: {
        type: 'String'
    },
    isGoogle: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true 
})

userSchema.pre('save', function(next) {
    if(this.password){
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User