const express = require('express');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const { addService, getServices, removeService, updateService } = require('../controllers/serviceController');


const router = express.Router();

router.route('/').post(isVerifiedUser, addService)
router.route('/').get(getServices)
router.route('/remove').post(removeService)
router.route('/:id').put(isVerifiedUser, updateService);


module.exports = router;