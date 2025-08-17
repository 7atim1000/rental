const { mongoose } = require('mongoose');
const Service = require('../models/serviceModel')


const addService = async(req, res, next) => {
    try {

        const { category, serviceName, serviceNo, status, color, price } = req.body ;
        const service = { category, serviceName, serviceNo, status, color, price } ;

        const newService = Service(service);
        await newService.save();

        res.status(201).json({ success: true, message: 'New service added Successfully', data: newService });
        
    } catch (error) {
        next(error)
    }
} 



const getServices = async(req, res, next) => {
    try {
    
        const services = await Service.find();
        res.status(200).json({ success: true, message: 'All services fetch successfully', services, data: services})
    } catch (error) {
        next(error);
    }
}


const removeService = async(req, res, next) => {
    try {

        await Service.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Car removed Successfully' })
    
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message });
    }

}


const updateService = async (req, res, next) => {
   
    try {

        const { status, orderId } = req.body;
        const { id } = req.params;
    
        // if (!mongoose.Types.ObjectId.isValid(id)){
        //     const error = createHttpError(404, "Invalid Id");
        //     return next(error);
        // };

        const service = await Service.findByIdAndUpdate(
            id,
            
            { status, currentOrder: orderId },
            { new : true }
        );

       
        // if (!service) {
        //     const error = createHttpError(404, 'Item is not Exist!');
        //     return error;
        // }

        res.status(200).json({ success: true, message: 'Service status updated successfully..', data: service })
        
    } catch (error) {
        next(error)
    }

}


module.exports = { addService, getServices, removeService, updateService }