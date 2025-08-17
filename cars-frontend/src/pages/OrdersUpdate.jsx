import React, { useState, useEffect } from 'react'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { enqueueSnackbar } from 'notistack';
import { api, updateItem, updateOrder } from '../https';
import BackButton from '../components/shared/BackButton';
import { RxUpdate } from "react-icons/rx";
import { toast } from 'react-toastify'
import BottomNav from '../components/shared/BottomNav';



const OrdersUpdate = () => {
    const [list, setList] = useState([]);
    const [inProgressInvoices, setInProgressInvoices] = useState([]);

    // filters
    const [frequency, setFrequency] = useState('365');
    const [orderStatus, setOrderStatus] = useState('all');
    const [shift, setShift] = useState('all');

    // useEffect(() => {
    //     const getInvoices = async () => {
    //         try {
    //             const res = await api.post('/api/order/fetch',
    //                 {
    //                     frequency,
    //                     orderStatus,
    //                     shift
    //                 });
    //             setList(res.data)
    //             console.log(res.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };

    //     getInvoices();
    // }, [frequency, orderStatus, shift]);


    // Solution 1: Move getInvoices outside the effect and add it to dependencies
    const getInvoices = async () => {
        try {
            const res = await api.post('/api/order/fetch', {
                frequency,
                orderStatus,
                shift
            });
            setList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInvoices();
    }, [frequency, orderStatus, shift, getInvoices]);



// update process
    const handleStatusChange = ({orderId, orderStatus}) => {                          // orderId ?
        orderUpdateMutation.mutate({orderId, orderStatus}, {
            onSuccess: () => {
            getInvoices(); // This will refetch after mutation succeeds
        }
        });
        
    };

    // Solution 2: Use the mutation's onSuccess callback (better approach if using react-query)
    // If you're using React Query's useMutation, you can use its onSuccess callback:
//     const orderUpdateMutation = useMutation(
//     ({ orderId, orderStatus }) => api.post('/api/order/update', { orderId, orderStatus }),
//     {
//         onSuccess: () => {
//             getInvoices(); // Will refetch after successful update
//         }
//     }
// );

// useEffect(() => {
//     const getInvoices = async () => {
//         try {
//             const res = await api.post('/api/order/fetch', {
//                 frequency,
//                 orderStatus,
//                 shift
//             });
//             setList(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     getInvoices();
// }, [frequency, orderStatus, shift]);


    const queryClient = useQueryClient();
    const orderUpdateMutation = useMutation({

           mutationFn: ({reqData, orderId, orderStatus}) => updateOrder({reqData, orderId, orderStatus}),

            onSuccess: (resData) => {                     // to set room update change data to resData
            const { data } = resData.data;                // to set room update added this const
                   
            //enqueueSnackbar('Order status updated successfully..', { variant: 'success' });
            toast.success('Order status updated and car returned successfully .') ;
           
            queryClient.invalidateQueries(['orders']);
                                       
            //update car to Available 
            // const itemData = { itemId: data.item, status: "Available",  }  // data.room from backend updateOrder controller
            const itemData = {          // roomData added in http file
                itemId: data.car,
                status: "Available",
                bookedBy: "",
                dateBooking: null,
                dateReturn: null,
                orderId: null ,      // data from backend  
                }
           
            setTimeout(() => {
            itemUpdateMutation.mutate(itemData);
            }, 1500)
                   
            }, 

            onError: ()=> {
                enqueueSnackbar('Failed to update order status!', { variant: 'error' });
            }

    })

    const itemUpdateMutation = useMutation({
        
    mutationFn: (reqData) => updateItem(reqData),
    onSuccess: (resData) => {
    const { data } = resData.data;

    toast.success('Car is available now .') ;
    console.log(data);
        
    }, 
    onError : (error) => {
        console.log(error)
    }
    });

    return (
       
        <div className ='' >
            <div className ='flex p-3 flex-wrap gap-1 items-center shadow-xl mb-1'>
                <BackButton />
                <h1 className ='text-[#1a1a1a] text-lg font-bold tracking-wide'>Rental Managament</h1>
            </div>

            <h2 className ='text-[#1a1a1a] text-xs font-normal underline my-2 mx-5'>Returning Car</h2>

            <div className ='overflow-x-auto px-5'>
                <table className ='w-full text-left'>
                    <thead className ='bg-white border-b-3 border-[#0ea5e9] text-xs font-normal text-[#0ea5e9]'>
                        <tr>
                            <th className ='p-1'>Return</th>
                            <th className ='p-1'></th>
                            <th className ='p-1'>Car</th>
                            <th className ='p-1'>Customer</th>
                            <th className ='p-1'>Total</th>
                            <th className ='p-1'>Payed</th>
                            <th className ='p-1'>Balance</th>

                            <th className ='p-1'></th>
                            <th className ='p-1'></th>  
                        </tr>
                    </thead>

                    <tbody>
                        {
                        // resData?.data.data.map((order, index) => (
                            list.map((order, index) => (
                            <tr
                            key ={index}
                            className ='hover:bg-sky-50 border-b border-[#0ea5e9] text-xs font-normal'
                            >
                                <td className ='p-1' hidden>{order._id}</td>
                                <td className ='p-1'>{new Date(order.dateReturn).toLocaleDateString('en-GB')}</td>
                              
                                    <td 
                                        className={`p-1 underline text-xs font-normal ${(() => {
                                        const returnDate = new Date(order.dateReturn);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        returnDate.setHours(0, 0, 0, 0);
                                        const daysDiff = Math.floor((returnDate - today) / (1000 * 60 * 60 * 24));

                                        // Apply red text if 1 day left or due today
                                        return daysDiff <= 1 ? 'text-[#be3e3f]' : 'text-[#0ea5e9]';
                                    })()
                                        }`}>
                                        {(() => {
                                            const returnDate = new Date(order.dateReturn);
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            returnDate.setHours(0, 0, 0, 0);
                                            const daysDiff = Math.floor((returnDate - today) / (1000 * 60 * 60 * 24));

                                            if (daysDiff > 1) return `${daysDiff} days left`;
                                            if (daysDiff === 1) return '1 day left';
                                            if (daysDiff === 0) return 'Due today';
                                            return `${Math.abs(daysDiff)} days overdue`;
                                        })()}

                                    </td>

                                <td className ='p-1'>{order.car.name}</td>
                                <td className ='p-1'>{order.customerDetails.name}</td>
                                <td className ='p-1 font-semibold'>{order.bills.totalWithTax.toFixed(2)}</td>
                                <td className ='p-1 font-semibold text-[#0ea5e9]'>{order.bills.payed.toFixed(2)}</td>
                                <td className ='p-1 font-semibold text-[#be3e3f]'>{order.bills.balance.toFixed(2)}</td>
                            
                                <td className ='p-1 text-xs font-semibold'>
                                <select
    
                                    className ={`cursor-pointer h-7 shadow-lg rounded-lg  text-[#1a1a1a] border border-gray-200
                                    ${order.orderStatus === 'Returned' ? "text-green-700 bg-green-200" : "text-orange-700 bg-orange-200"}`}
  
                                    value ={order.orderStatus}
                                    // onChange ={(e) => handleStatusChange({ orderId: order._id,  orderStatus: e.target.value })}
                                            onChange={(e) => {
                                                if (order.bills.balance === 0) {
                                                    handleStatusChange({
                                                        orderId: order._id,
                                                        orderStatus: e.target.value
                                                    });
                                                } else {
                                                    // toast.error("Cannot change status: The customer has an outstanding balance", {
                                                    //     position: "top-right",
                                                    //     autoClose: 5000,
                                                    // });

                                                    toast.error(
                                                        <div style={{ fontSize: '12px' }}>
                                                            Cannot change status: The customer has an outstanding balance
                                                        </div>,
                                                        {
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                        }
                                                    );


                                                    toast.error(
                                                        <div style={{ fontSize: '12px' }}>
                                                            Please go to customers management and do PAYMENT to this customer before returning car
                                                        </div>,
                                                        {
                                                            position: "top-left",
                                                            autoClose: 5000,
                                                        }
                                                    );
                                                }
                                            }}
                                
                                >
  
                                    <option className ='text-[#1a1a1a] rounded-lg cursor-pointer' value ='In Progress'>In Progress</option>
                                    <option className ='text-[#1a1a1a] rounded-lg cursor-pointer' value ='Returned'>Returned</option>
  
                                </select>
                            </td>

                            <td className ='p-4 text-center'>
                                <button className ={`${order.orderStatus === 'Returned' ? "text-green-700 " : "text-[#be3e3f]"} cursor-pointer text-xs font-semibold`}>
                                    <RxUpdate  size={20}/>
                                </button>
                            </td>



                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>

            <BottomNav />

        </div>
    )
}


export default OrdersUpdate;