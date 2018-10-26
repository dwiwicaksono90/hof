var express = require('express');
var router = express.Router();
const {add, find, del, upVote, downVote, getAll, edit, search, myThread} = require('../controllers/threads')
const {isLogin, isSelf, isUpVoted, isDownVoted} = require('../middlewares/index')

router.post('/', isLogin, add)
router.get('/', getAll)
// router.get('/my', isLogin, myThread)
router.get('/:id', find) 
router.put('/:id', isLogin, isSelf, edit)
router.delete('/:id', isLogin, isSelf, del)
router.get('/search/:q', search)
router.post('/upvote/:id', isLogin, isUpVoted, upVote)
router.post('/downvote/:id', isLogin, isDownVoted, downVote)


module.exports = router;
