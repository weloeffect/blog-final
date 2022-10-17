const express = require('express');
const router = express.Router();
const {viewCats, delCat, viewCat} = require('../controllers/admin/category.controller')



router.get('/select_category',viewCats )
router.get('/view_category/:id',viewCat )
router.delete('/remove/:slug',delCat )

module.exports = router;