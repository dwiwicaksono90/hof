const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const answerSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    upVotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    downVotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},{
    timestamps: true
});

// answerSchema.pre('remove', function(next) {
//     Article.update({ _id: this._id }, { "$pull": { "answers": this._id }},function(err, obj) {
//         next();
//     });
// });

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;