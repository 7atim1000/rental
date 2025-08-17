const express = require('express');
const { addCategory, getCategories, removeCategory } = require('../controllers/categoryController')

const router = express.Router();

router.route('/').post(addCategory)
router.route('/').get(getCategories)
router.route('/remove').post(removeCategory)


module.exports = router;