const express = require('express');

const  { isVerifiedUser }  = require("../middlewares/tokenVerification");
const { addOrder, getOrders, getOrderById, updateOrder, extraOrder, getOrderCustomer } = require("../controllers/orderController");

const router = express.Router();

router.route('/').post(isVerifiedUser, addOrder);
router.route('/fetch').post(isVerifiedUser, getOrders);
router.route('/:id').get(isVerifiedUser, getOrderById);
router.route('/:id').put(isVerifiedUser, updateOrder);

router.route('/:id').post(isVerifiedUser, extraOrder);

router.route('/orderCustomer').post(isVerifiedUser, getOrderCustomer);

module.exports = router ;
