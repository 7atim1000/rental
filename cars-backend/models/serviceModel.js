const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    
    category :{ type: String, required: [true, 'category field is required']},
    serviceName :{ type: String, required: [true, 'name field is required']},
    serviceNo :{ type: String, required: [true, 'car number field is required']},
    status: { type: String, default: 'Available'},
    price :{ type: Number, required: true},
    color: { type: String, required: [true, 'color field is required']},
    user: { type: mongoose.Schema.Types.String, ref: 'User'},
    currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}

}, { timestamps :true})

module.exports = mongoose.model('Service', serviceSchema);
