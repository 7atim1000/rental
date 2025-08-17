import React , {useState, useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'
import { api } from '../../https';


const RecentOrders = () => {
    // fetch 
    const [allInvoices, setAllInvoices] = useState([]);

    // filter 
    const [frequency, setFrequency] = useState('1')
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

                        sort: '-createdAt' // Add this parameter
                    });

                setAllInvoices(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
                message.error('Fetch Issue with transaction')

            }
        };

        getOrders();

    }, [frequency, orderStatus, shift]);


    return (
        <div className='px-8 mt-3'>

            <div className='bg-white w-full h-full overflow-y-scroll scrollbar-hidden rounded-lg shadow-lg/30 border-t-3 border-sky-400'>
            
                <div className='flex justify-between items-center px-6 py-1'>
                    <h1 className='text-[#1a1a1a] text-sm font-semibold tracking-wide'>Recent Orders</h1>
                    <a href='' className='text-sky-600 text-sm'>View all</a>
                </div>
                <div className ='flex items-center justify-between px-6 py-2'>
                    <div className ='flex items-center gap-2'>
                        <label htmlFor ='frequency' className ='text-sm text-sky-600 font-semibold'>Frequency</label>
                        <select id ='frequency' value ={frequency} onChange = {(e) => setFrequency(e.target.value)} 
                        className ='border border-[#0ea5e9] rounded-md px-2 py-1 text-sm'>
                            <option value ='1'>1 Day</option>
                            <option value ='7'> 7 Days</option>
                            <option value ='30'> 30 Days</option>
                            <option value ='90'> 90 Days</option>

                        </select>
                      
                        <label htmlFor ='orderSatus' className ='text-sm text-sky-600 font-semibold'>Status</label>
                        <select id ='orderStatus' value ={orderStatus} onChange ={(e) => setOrderStatus(e.target.value)} 
                        className ='border border-[#0ea5e9] rounded-md px-2 py-1 text-sm'>
                            <option value ='all'>All</option>
                            <option value ='In Progress'>In Progess</option>
                            <option value ='Completed'>Completed</option>
                            <option value ='Cancelled'>Cancelled</option>
                            <option value ='Pending'>Pending</option>

                        </select>
                      
                        <label htmlFor ='shift' className ='text-sm text-sky-600 font-semibold'>Shift</label>
                        <select id ='shift' value ={shift} onChange ={(e) => setShift(e.target.value)} 
                        className ='border border-[#0ea5e9] rounded-md px-2 py-1 text-sm'>
                            <option value ='all'>All</option>
                            <option value = 'Morning'>Morning</option>
                            <option value = 'Evening'>Evening</option>
                        </select>   
                    </div>
                </div>
                
                <div className ='mt-1 px-6 '>
                    {
                        allInvoices.length > 0 ? (
                            allInvoices.map((order, index) => (
                                <OrderList key={order._id} order={order} />
                            ))
                        ) : <p className='text-sm font-medium text-[#be3e3f]'>No invocies available now!</p>
                    }

                </div>



            </div>
        </div>
    );
};

export default RecentOrders ;