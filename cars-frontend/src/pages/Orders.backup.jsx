import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav';
import OrderCard from '../components/orders/OrderCard';
import BackButton from '../components/shared/BackButton';

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { enqueueSnackbar } from 'notistack';
import { getOrders } from '../https';
import { getBgColor } from '../utils';
import { GrRadialSelected } from 'react-icons/gr';

const Orders = () => {

    const [selected, setSelected] = useState(0) ;
    const [selectedStatus, setSelectedStatus] = useState('All')

    const Status = [
       { name: 'All', id:1 }, {name: 'In Progress' , id:2}, {name: 'Completed' , id:3}
    ]



    const [status, setStatus] = useState('all');
    // Fetch orders
     const { data: resData, isError } = useQuery({
        
        querykey: ['orders'],

        queryFn: async () => {
            return await getOrders ();
        },
        //placeholderData: keepPreviousData

    });

    if(isError) {
        enqueueSnackbar('Something went wrong!', {variant: "error"})
    }


    return (
        <section className ='bg-white h-[calc(100vh-5rem)]  gap-3 overflow-y-scroll scrollbar-hidden'>
            <div className ='flex items-center justify-between px-8 py-2'>
                <div className ='flex items-center'>
                    <BackButton />
                   <h1 className ='font-semibold text-md text-[#1a1a1a]'>Rental</h1>
                </div>
                
                <div key={Status.name} className ='flex items-center justify-around gap-4'>
                    {Status.map(status => ( 
                      <div key={status.name} className ='flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer'
                                  style = {{backgroundColor : getBgColor()}}
                                  onClick = {() => setSelectedStatus(status.name)}
                                  >
                                        <div className ='flex items-center justify-between w-full'>
                                            <h1 className ='text-md font-semibold text-[#f5f5f5] underline'>{status.name}</h1>
                                            {selected.id === status.id && <GrRadialSelected className  ='text-white' size={20}/>} 
              
                                        </div>
                                  </div>
              
                              ))} 
                </div>
            </div>

            <div className ='px-10 py-2 flex justify-between flex-wrap'>
                
                {/*
                 {
                    resData?.data.data.length > 0 ? (
                        resData.data.data.map((order) => {
                    
                            return <OrderCard key={order._id} order={order} />
                        })
                    )   : <p className ='col-span-3 text-sky-500'>No orders available now !</p>
                } 
                */}

                    {
                    //selected?.items.map((item) =>  {  // Static

                    resData?.data.data.filter(i => i.status === selectedStatus).map((order) => {      // Dinamic
                    return (   //flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer
                    <OrderCard  id={order._id} customer={order.customerDetails.customer} status={order.orderStatus}  total={order.bills.totalWithTax} />
                    
                    )
                    })
                }
                   
            </div>
            
            <BottomNav />
        </section>
    );
};


export default Orders;