const express = require('express');
const router = express.Router();
const {signupAdmin, loginAdmin} = require('../controllers/role.controller')

router.post('/signup',signupAdmin )


router.post('/login',loginAdmin )


module.exports = router;