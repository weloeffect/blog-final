const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/image')
const {viewPosts,viewPost,addPost, editPost, delPost, userPosts, addImg, viewPost2} = require('../controllers/post.controller')
// const {viewPost, addPost, editPost, deletePost} = require('../controllers/post.controller')
// const { addPost, upload} = require('../controllers/post.controller')

// router.get('/viewPostname',viewPost )


router.route('/add').post(uploadImage.single("image"), addImg);
router.route('/view').get(viewPosts);
router.route('/view/:id').get(viewPost);
router.route('/viewPost/:slug').get(viewPost2);
router.route('/add').post(addPost);
router.route('/edit/:id').put(uploadImage.single("image"), editPost);
router.route('/:id').delete(delPost);
router.route('/user/:id').get(userPosts);






// router.post('/create/postName',upload.single("ArticleImage"),addPost)



// router.put('/edit/id',editPost )


// router.delete('/remove/id',deletePost )



module.exports = router;