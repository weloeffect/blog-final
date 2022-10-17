const express = require('express');
const router = express.Router();
const {viewUsers,signupUser, loginUser, viewUser, signupUser2} = require('../controllers/user.controller')
const {addImg, viewImg, addPost} = require('../controllers/post.controller')
const uploadImage = require('../middleware/image')
router.route('/view').get(viewUsers);
router.route('/:id').get(viewUser);
// router.get('/view',viewUsers )
router.post('/signup',signupUser )
// router.post('/signup',signupUser2 )
router.post('/login',loginUser )
router.route('/:id/createPost').post(uploadImage.single("image"), addPost);
// router.post('/:id/createPost', addPost);
router.get('/image',viewImg )


module.exports = router;