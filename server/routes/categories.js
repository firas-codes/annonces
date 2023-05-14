const express = require('express');
const { addCategory, getCategories, getSingleCategory } = require('../controllers/categoriesController');
const router = express.Router();

router.route('/').post(addCategory).get(getCategories);
router.route('/:id').get(getSingleCategory);

module.exports = router;