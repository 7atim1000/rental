const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    
    customerName :{type: String, require :[true, 'Customername is required']},
    email : { type :String, require: true } ,
    contactNo :{ type: String, required: [true, 'Contact number is required']},
    address :{ type: String, required :[true, 'Customer address is required']},
    idNo :{ type: String, required :[true, 'Id number is required']},
    licenseNo :{ type: String, required :[true, 'License number is required']},
    balance: { type :Number, default :0 },

} ,{timestamps: true});



module.exports = mongoose.model('Customers', customerSchema)