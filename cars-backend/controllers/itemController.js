const Item = require("../models/itemModel");
const cloudinary = require('cloudinary').v2;
const { mongoose } = require('mongoose');

const addItem = async(req, res, next) => {
    try {

    const { name, price, category, carNo, color } = req.body ;
    const imageFile = req.file;

        // Validate required fields
        if (!name || !price || !category || !carNo || !color) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        };

        // Validate image exists
        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an employee image'
            });
        }

        // Check if  car already exists (better than checking name)
        // const existingCar = await Item.findOne({
        //     $or: [
        //         { name: name },
        //         { carNo: carNo }
        //     ]
        // });
         const existingCar = await Item.findOne({ carNo: carNo });

        if (existingCar) { message = 'Car with this ';
            // let message = 'Car with this ';
            // if (existingCar.name === name) {
            //     message += 'car name already exists';
            // } else {
            //     message += 'Car number already exists';
            // }
            return res.status(400).json({
                success: false,
                message: message
            });
        };

        
        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type: "image",
            folder: "employee_images" // Good practice to organize by folder
        });

        // Create new car
        const newCar = new Item({
            name,
            price,
            category,
            carNo,
            color,
          
            image: imageUpload.secure_url,
            cloudinaryId: imageUpload.public_id // Store for future deletion
        });

        await newCar.save();


        res.status(201).json({
            success: true,
            message: 'New car added successfully',
            data: newCar
        });

    } catch (error) {
        // Handle Cloudinary-specific errors
        if (error.message.includes('Cloudinary')) {
            return res.status(500).json({
                success: false,
                message: 'Error uploading image to Cloudinary'
            });
        }
        next(error);
    }
}


const getAllItems = async (req, res, next) => {
    
    try {
        const {  category, name, status, search, sort = '-createdAt', page = 1, limit = 10 } = req.body;
        const query = {
            ...(category && category !== 'all' && { category }),
            ...(name && name !== 'all' && { name }),
            ...(status && status !== 'all' && {status}),

            ...(search && {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { carNo: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } }
                ]
            })
        };


        let sortOption = {};
        if (sort === '-createdAt') {
            sortOption = { createdAt: -1 }; // Newest first
        } else if (sort === 'createdAt') {
            sortOption = { createdAt: 1 }; // Oldest first

        } else if (sort === 'name') {
            sortOption = { name: 1 }; // A-Z
        } else if (sort === '-name') {
            sortOption = { name: -1 }; // Z-A
        } else if (sort === 'category') {
            sortOption = { category: 1 }; // A-Z
        }

        // Calculate pagination values
        const startIndex = (page - 1) * limit;
        // const endIndex = page * limit;
        const total = await Item.countDocuments(query);

        // Get paginated results
        const items = await Item.find(query)
            .sort(sortOption)
            .skip(startIndex)
            .limit(limit)

        res.status(200).json({
            message: 'All cars fetched successfully',
            success: true,
            data: items,
            items,

            pagination: {
                currentPage: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        next(error)
    }
};


const removeItem = async (req, res) => {
    try {
        //const { id } = req.params;
        await Item.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Car removed Successfully' })
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message })
   
    }
}

// Update employee Controller
const updateItemImg = async(req, res, next) => {
    try {
        const { id } = req.params;
        const {  name, price, category, carNo, color } = req.body;
        let imageUrl;

        if( !name || !price || !category ||!carNo ||!color){
            return res.json({ success: false, message: 'Missing Details' });
        }

        // If a new image was uploaded
        if(req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, {resource_type: "image"});
            imageUrl = imageUpload.secure_url;
        }

        const updateData = {
            name,
            price,
            category,
            carNo,
            color,
        };

        // Only add image to update if a new one was uploaded
        if(imageUrl) {
            updateData.image = imageUrl;
        }

        const updatedCar = await Item.findByIdAndUpdate(id, updateData, { new: true });

        if(!updatedCar) {
            return res.json({ success: false, message: 'Car not found' });
        }

        res.json({ success: true, message: 'Car updated', car: updatedCar });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const updateItem = async (req, res, next) => {
   
    try {

        const { status, bookedBy, dateBooking, dateReturn, orderId } = req.body;
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Invalid Id");
            return next(error);
        };

        const item = await Item.findByIdAndUpdate(
            id,
            
            { status, bookedBy, dateBooking, dateReturn, currentOrder: orderId },
            { new : true }
        );

       
        if (!item) {
            const error = createHttpError(404, 'Item is not Exist!');
            return error;
        }

        res.status(200).json({ success: true, message: 'Car status updated successfully..', data: item })
        
    } catch (error) {
        next(error)
    }

};





module.exports = { addItem, getAllItems, updateItem, removeItem, updateItemImg }