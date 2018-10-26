const express = require('express');
const router = express.Router();
const {register, login, update, getUser, loginGoogle} = require('../controllers/users')
const {isLogin, googleCheck} = require('../middlewares/index')

router.post('/register', register)
router.post('/login', login)
router.get('/', isLogin, getUser)
router.post('/loginGoogle', googleCheck, loginGoogle)
// router.get('/', getUser)
// router.put('/:id', update)

module.exports = router;