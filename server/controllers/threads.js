const Thread = require('../models/thread')
    
module.exports = {
    add: (req, res) => {
        Thread.create({
            title: req.body.title,
            question: req.body.question,
            author: req.decoded.id
        })
        .then((result) => {
            res.status(201).json({msg: 'add Thread success', result: result})
        }).catch((err) => {
            res.status(500).json(err)
        });

    },
    find: (req, res) => {                
        Thread.findOne({
            _id: req.params.id
        })
        .populate('author')
        .populate({
            path :'answers',
            model :'Answer',
            populate :{
                path : 'user',
                model : 'User'}})
        .exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {            
            res.status(500).json(err)
        });
    },
    getAll: (req, res) => {
        Thread.find()
        .populate('author').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    del: (req, res) => {
        Thread.remove({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    edit: (req, res) => {
        Thread.updateOne({
            _id: req.params.id
        }, {
            title: req.body.title,
            question: req.body.text
        })
        .then((result) => {
            console.log('masuk result', result);
            
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    search: (req, res) => {
        var regexQuery = {
            title: new RegExp(req.params.q, 'i')
        }
        Thread.find(regexQuery)
        .populate('author').exec()
        .then((result) => {
            res.status(200).json({result})
        }).catch((err) => {
            res.status(500).json({err})
        }) 
    },
    myThreads: (req, res) => {
        Thread.find({
            author: req.decoded.id
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    upVote: (req, res) => {
        Thread.updateOne({
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
        Thread.updateOne({
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
