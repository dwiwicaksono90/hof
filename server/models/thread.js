const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

var threadSchema = new Schema({
    title : {
        type: String,
        required: [true, 'Title not null']
    },
    question : {
        type: String,
        required: [true, 'Question not null']
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    answers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Answer'
    }],
    upVotes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    downVotes: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    tags: [String]
}, { 
    timestamps: true 
})

// threadSchema.pre('save', function(next) {
//     if(this.password){
//         let salt = bcrypt.genSaltSync(10)
//         this.password = bcrypt.hashSync(this.password, salt)
//     }
//     next()
// })

var Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread