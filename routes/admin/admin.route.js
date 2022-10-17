const express = require('express');
const router = express.Router();
const {signupUser,loginUser, addUser, delUser, viewUsers, viewUser} = require('../../controllers/admin/admin.controller')
const {addCat,viewCat, viewCats, editCat, delCat} = require('../../controllers/admin/category.controller');
const { addPost, viewPosts } = require('../../controllers/post.controller');
const uploadImage = require('../../middleware/image')
router.post('/signup',signupUser )
router.post('/login', loginUser)
router.post('/addCategory',addCat )
router.get('/viewCategory',viewCats )
router.get('/Users',viewUsers )
router.get('/:id',viewUser )
router.post('/addAuthor',addUser )
// router.get('/:slug',viewCat )
router.get('/category/:id',viewCat )
// router.post('/edit/:slug',editCat )
router.post('/edit/:id',editCat )
// router.post('/:id/createPost',addPost )
router.route('/:id/createPost').post(uploadImage.single("image"), addPost);
router.delete('/remove/:slug',delCat )
router.delete('/removeUser/:id',delUser )
router.route('/').get(viewPosts);
module.exports = router;