const Answer = require('../models/answer')
const Thread = require('../models/thread')

module.exports = {
    add: (req, res) => {
        Answer.create({
            text: req.body.text,
            user: req.decoded.id
        })
        .then((data) => {
            Thread.updateOne({
                _id: req.body.threadId
            }, {
                $push: {
                    answers: data._id
                }
            })
            .then((result) => {
                res.status(201).json(result)
            })
        }).catch((err) => {
            res.status(500).json(err)          
        });

    },
    update: (req, res) => {
        Answer.updateOne({
            _id: req.params.id
        }, {
            text: req.body.text
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)          
        });
    },
    upVote: (req, res) => {
        Answer.updateOne({
            _id: req.params.id
        }, {
            $push: {
                upVotes: req.decoded.id
            }
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    downVote: (req, res) => {
        Answer.updateOne({
            _id: req.params.id
        }, {
            $push: {
                downVotes: req.decoded.id
            }
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    }

}