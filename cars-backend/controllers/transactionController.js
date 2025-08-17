const transactionModel = require("../models/transactionModel");
const moment = require('moment');

const addTransaction = async(req, res) => {

    function getCurrentShift() {
        const hour = new Date().getHours();
        // Example: morning = 6:00-17:59, evening = 18:00-5:59
        return (hour >= 6 && hour < 18) ? 'Morning' : 'Evening';
    };
    

    try {
        
        //const newTransaction = new transactionModel(req.body)
        const newTransaction = new transactionModel({
            ...req.body,
            shift: getCurrentShift(),
        });

        await newTransaction.save();
        //res.status(202).send('Transactoion created successfully')
          res.status(201).json({ success: true, message: 'Transaction created successfuly!', data: newTransaction });
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};


const getTransactions = async(req, res) => {

    try {

        const { frequency, type , shift, search, sort= '-createdAt' , page= 1, limit= 10} = req.body ;
        
        const query = {
            date: {
                $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
            ...(type && type !== 'all' && { type }),
            ...(shift && shift !== 'all' && { shift }),

            ...(search && {
                $or: [
                    { shift: { $regex: search, $options: 'i' } },
                    { type: { $regex: search, $options: 'i' } },
                   
                    { category: { $regex: search, $options: 'i' } },
                    { refrence: { $regex: search, $options: 'i' } }  
                ]
            })
            
        };

        // In your backend (getEmployees function)
        let sortOption = {};
        if (sort === '-createdAt') {
            sortOption = { createdAt: -1 }; // Newest first
        } else if (sort === 'createdAt') {
            sortOption = { createdAt: 1 }; // Oldest first

        } else if (sort === 'type') {
            sortOption = { type: 1 }; // A-Z
        } else if (sort === '-type') {
            sortOption = { type: -1 }; // Z-A
        } 

        // Calculate pagination values
        const startIndex = (page - 1) * limit;
        // const endIndex = page * limit;
        const total = await transactionModel.countDocuments(query) .populate({path: "user", select: ["name", "role"]});

        // Get paginated results
        const transactions = await transactionModel.find(query) .populate({path: "user", select: ["name", "role"]})
            .sort(sortOption)
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            message: 'All transactions fetched successfully',
            success: true,
            data: transactions,
            transactions,

            pagination: {
                currentPage: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });


        // after convert date field from date to string
        // const endDate = moment().format('YYYY-MM-DD');
        // const startDate = moment().subtract(Number(frequency), "d").format('YYYY-MM-DD');

        // by duration query
        // date :{
        //         $gt : moment().subtract(Number(frequency), "d").toDate(),
        //     },

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

} 



const removeTransaction = async(req, res, next) => {
    try {
        await transactionModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Transaction removed Successfully' })
        
    } catch (error) {
        next(error)
    }
};



module.exports = { getTransactions, addTransaction, removeTransaction }