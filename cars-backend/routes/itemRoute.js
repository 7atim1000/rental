const express = require('express');
const upload = require('../middlewares/multer')

const { isVerifiedUser } = require('../middlewares/tokenVerification');
const { addItem, getAllItems, updateItem,  removeItem, updateItemImg } = require('../controllers/itemController');

const router = express.Router();

// router.route('/').post(isVerifiedUser,addItem)
router.route('/').post( upload.single('image'), isVerifiedUser, addItem);
// router.route('/').get(getAllItems)
router.route('/fetch').post(isVerifiedUser, getAllItems);
router.route('/remove').post(removeItem)

router.route('/:id').put(isVerifiedUser, updateItem);
router.put('/update/:id', upload.single('image'), isVerifiedUser, updateItemImg);


module.exports = router ;