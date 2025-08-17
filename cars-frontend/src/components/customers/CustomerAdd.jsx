import React, {useState} from 'react'
import { useMutation } from '@tanstack/react-query';
import { addCustomer } from '../../https';
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { IoCloseCircle } from "react-icons/io5";



const customerAdd = ({setIsCustomerModalOpen}) => {
    const [formData, setFormData] = useState({
        customerName :'', email :'' ,contactNo :'', address :'', idNo :'', licenseNo :''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    };


    const handleClose = () => {
    setIsCustomerModalOpen(false)
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    customerMutation.mutate(formData)

    window.location.reload()
  
    };

    const customerMutation = useMutation({
        mutationFn: (reqData) => addCustomer(reqData),
        onSuccess: (res) => {
            setIsCustomerModalOpen(false);
            const { data } = res;
            toast.success(data.message)
        },

        onError: (error) => {
        const { response } = error;
        enqueueSnackbar(response.data.message, { variant: "error"});

        console.log(error);
        },

    })


    return (
        
        <div className ='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
            initial ={{opacity :0 , scale :0.9}}
            animate ={{opacity :1, scale :1}}
            exit ={{opacity :0, scale :0.9}}
            transition ={{durayion :0.3 , ease: 'easeInOut'}}
            className ='bg-white p-3 rounded-lg shadow-lg/30 w-120 md:mt-2 mt-5 h-[calc(100vh)] overflow-y-scroll scrollbar-hidden'
            >
                       
                       
            {/*Modal Header */}
            <div className="flex justify-between items-center mb-4 shadow-xl p-1">
                <h2 className ='text-[#1a1a1a] text-sm font-semibold'>New Customer</h2>
                <button onClick ={handleClose} 
                className='rounded-sm border-b border-[#be3e3f] text-[#be3e3f] cursor-pointer hover:bg-[#be3e3f]/30'
                >
                    <IoCloseCircle size={25}/>
                </button>
            </div>
                                 
            {/*Modal Body*/}
            <form className ='mt-3 space-y-6' onSubmit ={handleSubmit}>
                <div className ='mt-5 flex items-center justify-between'>
                    <label className ='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Customer Name :</label>
                    <div className ='flex w-[75%] items-center p-3 shadow-xl'>
                        <input 
                            type ='text'
                            name ='customerName'
                            value ={formData.customerName}
                            onChange ={handleInputChange}
                                                  
                            placeholder = 'Enter customer name'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

                <div className='mt-5 flex items-center justify-between'>
                    <label className='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Email :</label>
                    <div className='flex w-[75%] items-center p-3 shadow-xl'>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}

                            placeholder='Enter customer email'
                            className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>
        
                                
                <div className ='mt-5 flex items-center justify-between'>
                    <label className ='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Contact No :</label>
                    <div className ='flex w-[75%] items-center p-3 shadow-xl'>
                        <input 
                            type ='text'
                            name ='contactNo'
                            value ={formData.contactNo}
                            onChange ={handleInputChange}
                                                  
                            placeholder = '+971 999999999'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>
                
                <div className ='mt-5 flex items-center justify-between'>
                    <label className ='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Customer Address :</label>
                    <div className ='flex w-[75%] items-center p-3 shadow-xl'>
                        <input 
                            type ='text'
                            name ='address'
                            value ={formData.address}
                            onChange ={handleInputChange}
                                                  
                            placeholder = 'Enter customer address'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            autoComplete='none'
                        />
                    </div>       
                </div>        
                            
                <div className ='mt-5 flex items-center justify-between'>
                    <label className ='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Customer ID :</label>
                    <div className ='flex w-[75%] items-center p-3 shadow-xl'>
                        <input 
                            type ='text'
                            name ='idNo'
                            value ={formData.idNo}
                            onChange ={handleInputChange}
                                                  
                            placeholder = 'Enter customer ID'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

                <div className ='mt-5 flex items-center justify-between'>
                    <label className ='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>License No :</label>
                    <div className ='flex w-[75%] items-center p-3 shadow-xl'>
                        <input 
                            type ='text'
                            name ='licenseNo'
                            value ={formData.licenseNo}
                            onChange ={handleInputChange}
                                                  
                            placeholder = 'Enter customer license No'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>
                           
                       
                <button
                    type ='submit'
                    className ='p-3 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer'
                >
                    Add Customer
                </button>
                                                  
                                         
                </form>
            </motion.div>
        </div> 
    );
};



export default customerAdd ;