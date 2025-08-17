const Category = require('../models/categoryModel');

const addCategory = async (req, res, next) => {
   
    try {

    const { name } = req.body ;
    
    if (!name) {
        res.status(400).json({ status: false, message: 'Please privide category name' })
    }

    const isCategoryPresent = await Category.findOne({ name });
    if (isCategoryPresent) {
        res.status(400).json({ status: false, message: 'Category is already exist' });
    }

    //const newCategory = new Category({ name });
    //await newCategory.save();

    
    const category = { name };
    const newCategory = Category(category);
    await newCategory.save();

    res.status(200).json({ status: true, message: 'Category added Successfully', data: newCategory })


    } catch (error) {
       next(error)    
    }
}


const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: 'All categories fetched successfully', success:true, categories, data: categories })
    } catch (error) {
        next(error)
    }
}


const removeCategory = async(req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Class removed Successfully' })
        
    } catch (error) {
        
    }
}


module.exports = { addCategory, getCategories, removeCategory };