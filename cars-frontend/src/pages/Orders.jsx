import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/shared/BackButton';

import { RxUpdate } from "react-icons/rx";

import { api} from '../https';

import OrderCard from '../components/orders/OrderCard';
import BottomNav from '../components/shared/BottomNav';
import { MdOutlineUpdate } from 'react-icons/md';

const Orders = () => {
    
    const navigate = useNavigate();

    // fetch Orders
    const [allInvoices, setAllInvoices] = useState([]);

    // filter by date
    const [frequency, setFrequency] = useState('365')
    const [orderStatus, setOrderStatus] = useState('all')
    const [shift, setShift] = useState('all')

    useEffect(() => {

        const getOrders = async () => {
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                        orderStatus,
                        shift,

                        sort: '-createdAt'
                    });

                setAllInvoices(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
                message.error('Fetch Issue with transaction')
            };
        };

        getOrders();

    }, [frequency, orderStatus, shift]);


return (
    <>
        <section className ='h-[calc(100vh)] overflow-y-scroll scrollbar-hidden'>

            <div className='flex items-center justify-between px-10 py-1 shadow-xl mb-1'>

                <div className='flex gap-4 justify-between'>
                    <BackButton />
                    <h1 className='text-[#1a1a1a] text-l font-bold tracking-wider mt-2'>Orders</h1>
                </div>

                <div className ='flex items-center justify-between px-6 py-2'>
                    <div className ='flex items-center gap-2'>
                        <label htmlFor ='frequency' className ='text-xs text-sky-600 font-semibold'>By date</label>
                        <select id ='frequency' value ={frequency} onChange = {(e) => setFrequency(e.target.value)} 
                        className ='border border-[#0ea5e9] rounded-md px-2 py-1 text-sm'>
                            <option value ='1'>1 Day</option>
                            <option value ='7'> 7 Days</option>
                            <option value ='30'> 30 Days</option>
                            <option value ='90'> 90 Days</option>

                        </select>
                      
                        <label htmlFor ='orderSatus' className ='text-xs text-sky-600 font-semibold'>Status</label>
                        <select id ='orderStatus' value ={orderStatus} onChange ={(e) => setOrderStatus(e.target.value)} 
                        className ='border border-[#0ea5e9] rounded-md px-2 py-1 text-sm'>
                            <option value ='all'>All</option>
                            <option value ='In Progress'>In Progess</option>
                            <option value ='Cancelled'>Cancelled</option>
                            <option value ='Returned'>Returned</option>

                        </select>
                      
                        <label htmlFor ='shift' className ='text-xs text-sky-600 font-semibold'>Shift</label>
                        <select id ='shift' value ={shift} onChange ={(e) => setShift(e.target.value)} 
                        className ='border border-[#0ea5e9] rounded-md px-2 py-1 text-sm'>
                            <option value ='all'>All</option>
                            <option value = 'Morning'>Morning</option>
                            <option value = 'Evening'>Evening</option>
                        </select>   
                    </div>
                    
                    <div className ='flex gap-2 items-center justify-around gap-3 hover:bg-[#0ea5e9] shadow-lg/30 ml-5'>
                        <button

                            onClick={() => navigate('/rentmanagement')}

                            className='bg-white px-4 py-2 text-[#1a1a1a] cursor-pointer
                                font-semibold text-xs flex items-center gap-2 rounded-full'
                            >
                                Returing Cars
                                <RxUpdate className ='inline w-5 h-5 text-[#0ea5e9]'/>
                           
                        </button>
                    </div>
                    

                </div>

              

                    

               

            </div>
            

            <div className='px-10 py-4 flex flex-wrap gap-6 overflow-y-scroll scrollbar-hidden '>

                {
                    allInvoices.length > 0 ? (
                        allInvoices.map((order, index) => (
                            <OrderCard key={order._id} order={order} />
                        ))
                    ) : <p className='text-sm font-medium text-[#f6b100]'>No invocies available now</p>
                }

            </div>

       <BottomNav />

       </section>
    </>
        
    );
}


export default Orders