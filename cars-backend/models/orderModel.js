const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
    
    customerDetails : {
        name: { type: String },
        customer: { type: String },
        phone: { type: String },
        email : { type: String},
        licenseNo : { type: String},
    },
    
    bills: {
        total: { type: Number },
        tax: { type: Number },
        totalWithTax: { type: Number },
        payed: { type: Number, required: true },
        balance: { type: Number, required: true }
    },

    items : [], 

    orderType: { type: String },
    orderNo: { type: String },
    orderStatus: { type: String },
    orderDate: { type: Date, default: Date.now() },
    shift: { type: String, enum: ['Morning', 'Evening'], required: true },

    customer : { type: mongoose.Schema.Types.ObjectId, ref: "Customers"},
    car : { type: mongoose.Schema.Types.ObjectId, ref: "Item"},
    
    payment :{ type: Number},
    paymentMethod: {type: String},

    dateBooking: {type: Date},
    dateReturn: {type: Date},
    bookingDays: {type: Number},


    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
    

}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema);
