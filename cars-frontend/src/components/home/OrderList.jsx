import React from 'react'
import { BsCalendar2Date } from "react-icons/bs";
import { FaCheckDouble } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'
import { GrInProgress } from 'react-icons/gr'
import { getAvatarName } from '../../utils'

const OrderList = ({key, order}) => {
    
    return (
        
        <div className='flex items-center justify-between gap-5 mb-3 bg-sky-50  p-2 rounded-lg shadow-xl'>

            <button className='bg-[#0ea5e9] p-1 w-10 h-10 text-xs font-semibold rounded-full text-white'>{getAvatarName(order.customerDetails.name)}</button>

         

                <div className='flex flex-col items-center gap-1'>
                    <BsCalendar2Date className='inline w-5 h-5 text-green-600'/>
                    <p className ='text-xs font-normal'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</p>
                    <h1 className='text-sky-600 text-xs tracking-wide'>{order.customerDetails.name}</h1>
                    
                    <div className ='flex items-center gap-5 justify-between'>
                        <p className ='text-xs font-normal text-[#1a1a1a]'>Car : 
                            <span className ='text-xs font-semibold text-sky-600'> {order.car.name}</span>
                        </p>
                        <p className ='text-xs font-normal text-[#1a1a1a]'>CarNo : 
                            <span className ='text-xs font-semibold text-sky-600'> {order.car.carNo}</span>
                        </p>
                    </div>
                    
                </div>

                <div className='flex flex-col items-center gap-2'>
                    {
                        order.orderStatus === "Returned" ? (
                            <>
                                <p className='text-white  bg-green-600 p-1 rounded-lg text-xs font-semibold'><FaCheckDouble className='inline mr-2 text-white' />{order.orderStatus}</p>
                            </>

                        ) : (
                            <>
                                <p className='text-white bg-[#f6b100] p-1 rounded-lg text-xs font-semibold'><GrInProgress className='inline mr-2' />{order.orderStatus}</p>
                            </>

                        )
                    }

                    <div className ='mt-1'>
                        <p className ='text-xs text-[#1a1a1a]'>TOTAL : <span className ='text-lg font-medium text-sky-600'>{order.bills.totalWithTax.toFixed(2)}</span>
                        <span className ='text-xs font-normal text-[#1a1a1a]'> AED</span>
                        </p>
                    </div>
                </div>

            

            

        </div>
    )
}

export default OrderList 