import React ,{useState} from 'react'

import { motion } from 'framer-motion'
import { IoCloseCircle } from "react-icons/io5";

import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { addOrder,  updateCustomer } from '../../https';
import PaymentInvoice from './PaymentInvoice';

const CustomerPayment = ({setIsPaymentModal}) => {

    const handleClose = () => {
        setIsPaymentModal(false)
    }
    
    const customerData = useSelector((state) => state.customer);
    const userData = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        payed: 0, description: '',
        date: new Date().toISOString().slice(0, 10)
    });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    };

    // payment Method
    const [paymentMethod, setPaymentMethod] = useState();
    
    //  reportInvoice
    const [paymentInvoice, setPaymentInvoice] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState();

    const handlePlaceOrder = async () => {

        if (!paymentMethod) {
            toast.warning('Please select payment method !')
            return;
        };

        if (paymentMethod === "Cash" || paymentMethod === 'Online') {

            const paymentOrderData = {

                orderNumber: `${Date.now()}`,
                orderType: 'customersPayment',
                orderStatus: "Completed",
           
                customer: customerData.customerId,
                customerDetails :{
                    name : customerData.customerName ,
                    email : customerData.customerEmail ,
                    phone : customerData.contactNo ,
                },
     
                bills: {
                    total: 0,
                    tax: 0,
                    totalWithTax: 0,
                    payed: formData.payed,
                    balance: 0
                },

                // to save New Items || NEEDED
                items: null,
                paymentMethod: paymentMethod,

                // date :  new Date(formData.date + 'T00:00:00Z').toISOString().slice(0, 10)
                orderDate: formData.date ,
                user: userData._id,
            };

            setTimeout(() => {
                paymentMutation.mutate(paymentOrderData);
            }, 1500);

        }
    };

  
    const paymentMutation = useMutation({
        mutationFn: (reqData) => addOrder(reqData),

        onSuccess: (resData) => {
            const { data } = resData.data; // data comes from backend ... resData default on mutation
            console.log(data);

            setPaymentInfo(data)  // to show details in report            

            toast.success('Customer payment confirm successfully .');

            // // transfer to financial 
            // const transactionData = {

            //     transactionNumber: `${Date.now()}`,
            //     amount: formData.payed,
            //     type: 'Income',
            //     category: 'customerPayment',
            //     refrence: '-',
            //     description: '-',
            //     date: formData.date

            // }

            // setTimeout(() => {
            //     transactionMutation.mutate(transactionData)
            // }, 1500)




            // Update customer 
            const balanceData = {
                balance: customerData.balance - formData.payed,
                customerId: customerData.customerId
            }

            setTimeout(() => {
                customerUpdateMutation.mutate(balanceData)
            }, 1500)

            setPaymentInvoice(true); // to open report 
            setPaymentMethod('');
            
            
        },


        onError: (error) => {
            console.log(error);
        }
    });

    
    const customerUpdateMutation = useMutation({

        mutationFn: (reqData) => updateCustomer(reqData),
        onSuccess: (resData) => {

            console.log(resData);
        },
        onError: (error) => {
            console.log(error)
        }
    });

    // // add transaction  ...
    // const transactionMutation = useMutation({
    //     mutationFn: (reqData) => addTransaction(reqData),

    //     onSuccess: (resData) => {
    //         const { data } = resData.data; 
    //         //console.log(data);       
    //         toast.success('The revenue was transferred to the finance department .');
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     }
    // });

    
    
    return (
     
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }} >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-white p-3 rounded-lg shadow-lg/30 w-120 md:mt-2 mt-5 h-[calc(100vh)]'
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center mb-4 shadow-xl p-2 ">
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-[#1a1a1a] text-md font-semibold'>Customers Payment</h2>
                        <p className='text-md text-sky-600 font-medium'> 
                            <span className='text-sky-600 font-normal text-xs font-normal'>Make a payment to the customer : </span>
                            <span className ='text-[#1a1a1a] font-medium text-xs'>{customerData.customerName}</span>
                        </p>
                        <p className ={`${customerData.balance === 0 ? "text-green-600" : "text-[#be3e3f]"} text-xs font-medium`}> 
                            <span className='text-black font-normal text-sm'>He has debt of : </span> {Number(customerData.balance).toFixed(2)}
                            <span className='text-xs font-normal text-[#1a1a1a]'> AED</span></p>
                    </div>
                    <button onClick={handleClose} 
                    className='rounded-sm border-b border-[#be3e3f] text-[#be3e3f] cursor-pointer hover:bg-[#be3e3f]/30'
                    >
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/*Modal Body  onSubmit={handlePlaceOrder}*/}
                <form className='mt-5 space-y-6'>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-[#1a1a1a] block mb-2 mt-3 text-sm font-normal'>Date :</label>
                        <div className='flex w-[80%] items-center p-3 shadow-xl'>
                            <input
                                type='date'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange}

                                placeholder='Enter date'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-xs font-semibold border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-[#1a1a1a] block mb-2 mt-3 text-sm font-normal'>Amount :</label>
                        <div className='flex w-[80%] items-center p-3 shadow-xl'>
                            <input
                                type='text'
                                name='payed'
                                value={formData.payed}
                                onChange={handleInputChange}

                                placeholder='Enter amount'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-xs font-semibold border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-[#1a1a1a] block mb-2 mt-3 text-sm font-normal'>Descripion :</label>
                        <div className='flex w-[80%] items-center  p-3  shadow-xl'>
                            <input
                                type='text'
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}

                                placeholder='Enter description'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-xs font-semibold border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-3 px-5 py-2  mt-10 mb-2'>
                        <button className={`px-4 py-3 w-full rounded-lg  text-sm font-semibold  cursor-pointer shadow-lg/30
                        ${paymentMethod === 'Cash' ? "bg-[#0ea5e9] text-white" : "bg-sky-50 text-sky-600"}`}
                            //onClick ={() => setPaymentMethod('Cash')}
                            type='button'
                            onClick={() => setPaymentMethod('Cash')}


                        >Cash</button>

                        <button className={`px-4 py-3 w-full rounded-lg  text-sm font-semibold cursor-pointer shadow-lg/30
                            ${paymentMethod === 'Online' ? "bg-[#0ea5e9] text-white" : "bg-sky-50 text-sky-600 "}`}
                            onClick={() => setPaymentMethod('Online')}
                            type='button'
                        >Online</button>
                    </div>

                    <div className='flex items-center gap-3 px-5 mt-5'>
                        {/*bg-[#F6B100] */}
                        <button className='bg-[#0ea5e9] text-white px-4 py-4 w-full rounded-lg  cursor-pointer font-semibold text-sm font-medium shadow-lg/30'
                            type='button'
                            onClick={handlePlaceOrder}
                        >Confirm Payment</button>
                    </div>

                    {paymentInvoice && (
                        <PaymentInvoice paymentInfo ={paymentInfo} setPaymentInvoice ={setPaymentInvoice} />
                    )}


                </form>
            </motion.div>
        </div>

    );
};


export default CustomerPayment ;