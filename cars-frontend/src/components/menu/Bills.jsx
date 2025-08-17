import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getTotalPrice } from '../../redux/slices/cartSlice';
import { removeAllItems } from '../../redux/slices/cartSlice';
import { removeCustomer } from '../../redux/slices/customerSlice';
import { useMutation } from '@tanstack/react-query';


import { toast } from 'react-toastify'

import { addOrder, addTransaction, updateCustomer, updateItem } from '../../https';
import Invoice from '../invoice/Invoice'
import { removeCar } from '../../redux/slices/carSlice';




const Bills = () => {
    // total Accounting
    const dispatch = useDispatch();

    const customerData = useSelector((state) => state.customer);
    const carData = useSelector(state => state.car);
    const userData = useSelector((state) => state.user);
    const cartData = useSelector(state => state.cart);

 
    const total = useSelector(getTotalPrice);
    const taxRate = 5.25;
    const tax = (total * taxRate) / 100;
    const totalPriceWithTax = total + tax;

    // Payed amount 
    const [payedAmount, setPayedAmount] = useState(0)
    const showPayed = () => {
        setPayedAmount(totalPriceWithTax)
    };

    const balance = totalPriceWithTax - payedAmount;

    const cashPaymethod = () => {

        setPaymentMethod('Cash');
        showPayed();
    };
    const onlinePaymethod = () => {

        setPaymentMethod('Online');
        showPayed();
    };


      // Get booking data from first cart item
    const firstItem = cartData[0] || {};
    const dateBooking = firstItem.dateBooking || "";
    const dateReturn = firstItem.dateReturn || "";
    const bookingDays = Number(firstItem.bookingDays || firstItem.qty || 0);

    // handle Insert
    const [paymentMethod, setPaymentMethod] = useState();
    const [showInvoice, setShowInvoice] = useState(false);
    const [orderInfo, setOrderInfo] = useState();

    // Press placeOrder
    const handlePlaceOrder = async () => {
         
            
        if (!paymentMethod){
            //enqueueSnackbar('please select a payment method', {variant: "warning"});
            toast.warning('Please select payment method !')
            return;
            }
        if (!customerData.customerName) {
            //enqueueSnackbar('please select a payment method', {variant: "warning"});
            toast.warning('Please select customer !')
            return;
        }
         
        if (paymentMethod === "Cash" || paymentMethod === 'Online') {
            const orderData = {
            
           
            // to save customer
            customerDetails: {
                name: customerData.customerName,
                customer: customerData.customerName,
                phone: customerData.contactNo,
                email: customerData.email,
                licenseNo : customerData.licenseNo
            },
            
            // to save Status
            orderStatus: "In Progress",
            orderType: "Rent Invoice",
            orderNo: `${Date.now()}`,
                
            // to save TOTALS   || NEEDED
            bills: {
                total: total,
                tax: tax ,
                totalWithTax: totalPriceWithTax,

                payed: payedAmount,
                balance: balance,
            },
    
            // to save New Items || NEEDED
            items: cartData,
          
    
            car: carData._id,
            customer : customerData.customerId,
            paymentMethod: paymentMethod,

        
            dateBooking,
            dateReturn,
            bookingDays,
    
            user: userData._id,

            };
    
            setTimeout(() => {
                orderMutation.mutate(orderData);
            }, 1500);
    
            }
    
        }

// order Mutation 
    const orderMutation = useMutation ({ 

    mutationFn: (reqData) => addOrder(reqData),
                  
        onSuccess: (resData) => {
            const { data } = resData.data; // data comes from backend ... resData default on mutation
            console.log(data);
                       
            setOrderInfo(data)  // to show details in report 
                       
            // msg
            //enqueueSnackbar('Order Placed!', {variant: "success"});
            toast.success('Order confirmed successfully .') ;
                
        
            // Update item 
            const itemData = {          // roomData added in http file
                status: "Rented",
                bookedBy: customerData.customerName,
                dateBooking: dateBooking,
                dateReturn: dateReturn,

                orderId: data._id ,      // data from backend

                itemId: data.car     // data from backend
                    
                }
    
                setTimeout(() => {
                    itemUpdateMutation.mutate(itemData)
                }, 1500);

            // Update customer 
            const balanceData = {
                // balance:  balance + customerData.balance,
                balance: balance + customerData.balance,
                customerId: data.customer
            }

            setTimeout(() => {
                customerUpdateMutation.mutate(balanceData)
            }, 1500);

            const transactionData = {
                transactionNumber: `${Date.now()}`,

                amount: payedAmount,
                type: 'Income',
                category: 'Rental invoice',
                refrence: customerData.customerName,
                description: '-',
                date: new Date().toISOString().slice(0, 10),
                user: userData._id
            }
            setTimeout(() => {
                transactionMutation.mutate(transactionData)
            }, 1500);
                
        
        
                setShowInvoice(true); // to open report 
                setPaymentMethod('')
        
                dispatch(removeCar());
                dispatch(removeCustomer());
                dispatch(removeAllItems());
                // hidePayed();
                setPayedAmount(0)
            },
                       
                    
            onError: (error) => {
                console.log(error);
            }
        });

    // update Item
    
    const itemUpdateMutation = useMutation({
    
        mutationFn: (reqData) => updateItem(reqData),
        onSuccess: (resData) => {
                
            console.log(resData);
    
            }, 
            onError : (error) => {
            console.log(error)
            }
        });
    // update Customer
    const customerUpdateMutation = useMutation({

        mutationFn: (reqData) => updateCustomer(reqData),
        onSuccess: (resData) => {

            console.log(resData);

        },
        onError: (error) => {
            console.log(error)
        }
    });

    // add transaction 
    const transactionMutation = useMutation({
        mutationFn: (reqData) => addTransaction(reqData),

        onSuccess: (resData) => {

            const { data } = resData.data; // data comes from backend ... resData default on mutation     
            toast.success('The income was transfered to the finance department .');
        },
        onError: (error) => {
            console.log(error);
        }
    });




    return (
        <>
            <div className ='flex items-center justify-between px-5 mt-2 shadow-xl'>
                <p className ='text-xs text-[#1f1f1f] font-medium mt-2'>Count : {cartData.length}</p>
                <p className ='ml-0  text-[#1f1f1f]'><span className ='text-xs font-medium text-green-700'>AED </span><span className ='text-sm font-semibold'>{total.toFixed(2)}</span></p>
            </div>

            <div className ='flex items-center justify-between px-5 mt-2 shadow-xl'>
                <p className ='text-xs text-[#1f1f1f] font-medium mt-2'>Tax(5.25%)</p>
                <p className ='ml-0  text-[#1f1f1f]'><span className ='text-xs font-medium text-green-700'>AED </span><span className ='text-sm font-semibold'>{tax.toFixed(2)}</span></p>
            </div>

            <div className ='flex items-center justify-between px-5 mt-2 shadow-xl'>
                <p className ='text-xs text-[#1f1f1f] font-medium mt-2'>Grand Total :</p>
                <p className ='ml-0  text-[#0ea5e9]'><span className ='text-xs font-medium text-green-700'>AED </span>
                <span className ='text-xl font-semibold'>{totalPriceWithTax.toFixed(2)}</span></p>
            </div>

            <div className='flex bg-[#0ea5e9]  items-center justify-between px-5 mt-5 shadow-lg/30 p-5 rounded-lg'>

                <div className='flex gap-1 items-center justify-between'>
                    <p className='text-xs text-gray-100 font-medium mt-2'>Payed :</p>

                    <input className='w-17 text-white text-xl font-semibold'
                        name='payedAmount'
                        type='text'
                        value={Number(payedAmount).toFixed(2)}
                        onChange={(e) => Number(setPayedAmount(e.target.value))}
                    />
                    <span className='text-xs font-normal text-gray-100 mt-3'> AED</span>
                </div>

                <div className='flex items-center justify-between gap-1'>
                    <p className='text-xs text-gray-100 font-medium mt-2'>Balance :</p>
                    <p className='ml-0  text-[#f6b100]'><span className='text-2xl font-semibold'> {balance.toFixed(2)}</span>
                        <span className='text-xs font-normal text-gray-100'> AED</span>
                    </p>

                </div>


            </div>

       

               <div className ='flex items-center gap-3 px-5 py-2 mt-4'>
                <button  className ={`px-4 py-2 w-full rounded-lg font-semibold cursor-pointer shadow-lg/30
                ${paymentMethod === 'Cash' ? "bg-green-600 text-[#f5f5f5] " : "bg-[#f5f5f5] text-[#1a1a1a] "}`} 
                onClick ={cashPaymethod}
                >Cash</button>
          
                <button  className ={`px-4 py-2 w-full rounded-lg  font-semibold cursor-pointer shadow-lg/30
                ${paymentMethod === 'Online' ? "bg-green-600 text-[#f5f5f5] " : "bg-[#f5f5f5] text-[#1a1a1a] "}`} 
                onClick ={onlinePaymethod}
                >Online</button>
            </div>

            <div className ='flex items-center gap-3 px-5 mt-2'>
                <button className ='bg-[#0ea5e9] shadow-lg/30 px-4 py-2 w-full rounded-lg text-[#1a1a1a] cursor-pointer font-semibold text-[#f5f5f5] text-sm font-medium'>Print Receipt</button>
                <button className ='bg-[#F6B100] shadow-lg/30 px-4 py-2 w-full rounded-lg text-[#1a1a1a] cursor-pointer font-semibold text-sm font-medium'
                onClick ={handlePlaceOrder}
                >Place Order</button>
            </div>

            {showInvoice && (
                <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
            )}
        </>
    );
};


export default Bills;