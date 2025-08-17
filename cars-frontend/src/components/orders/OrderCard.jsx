import React from 'react'
import { FaCircle, FaCheckCircle } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
    

import { getAvatarName } from '../../utils';
import { GrInProgress } from 'react-icons/gr';

//const OrderCard = ({order}) => {
const OrderCard = ({key, order}) => {  
    return (
       <div className ='w-[390px] bg-white p-4 rounded-lg mb-4 shadow-sm shadow-lg/30 border-b-1 border-[#0ea5e9] '>
            
            <div className ='flex items-center gap-2'>
                
                <button className ='bg-[#f6b100] text-[#0ea5e9] p-1 w-10 h-10 text-xs font-semibold rounded-full'>
                    {getAvatarName(order.customer.customerName)}
                </button> 
                <div  className ='flex items-center justify-between w-[100%]'>
                
                    <div className ='flex flex-col items-start gap-1'>
                        
                        <p className ='text-xs text-[#0ea5e9]'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</p>
                        <div className ='flex items-center'>
                           <p className ='text-[#0ea5e9] text-xs'>Car :<IoCarSportSharp className ='text-orange-700 inline ml-1 mr-1'/></p>
                           <span className ='text-xs text-black font-semibold'>{order.car.name}</span>
                        </div>
                        <p className ='text-[#0ea5e9] text-xs font-normal'>{order.car.carNo}</p>
                                                
                    </div>

                    <div className ='flex flex-col items-center gap-2'>
                        <p className ={`px-4 text-xs font-semibold p-1 rounded-sm shadow-xl ${order.orderStatus === 'Returned' ? 'text-green-700 bg-green-200' 
                            : 'bg-orange-100 text-[#f6b100]'}`}>
                        <FaCheckCircle   hidden={order.orderStatus === "In Progress"} className ='inline mr-1 text-white' size ={16}/> 
                        <GrInProgress hidden={order.orderStatus === 'Returned'} className ='inline mr-1 text-[#f6b100]' size ={16}/>
                        {order.orderStatus}
                        </p>
                        <p className ='text-xs font-medium text-[#0ea5e9]'>License : <span className ='text-xs text-[#1f1f1f] font-semibold'>{order.customer.licenseNo}</span></p>
                    </div>

                </div> 

            </div>
            

            <div className ='flex justify-between items-center  mt-4 text-[#1f1f1f]'>
                <div className ='pl-2 flex gap-1'>
                    <FaUserTie className ='text-green-600'/>
                    <h1 className ='text-[#1a1a1a] text-sm font-semibold'>{order.customer.customerName}</h1>
                    
                </div>
                <p className ='text-sm mr-5 font-semibold text-xs'>
                    <span className = 'font-semibold text-xs text-[#1f1f1f]'>Rent For</span>
                    <span className = 'font-semibold text-sm text-[#0ea5e9]'> {order.bookingDays}</span>
                    <span className = 'font-semibold text-xs text-[#1f1f1f]'> Days</span> 
                </p>
            </div>
    
            <hr className ='w-full  mt-2 border border-[#f5f5f5]' />

            <div className ='flex items-center justify-between'>
                <div className='flex gap-2 mt-2 items-center'>
                    <h1 className='text-[#1a1a1a] font-normal text-xs'>Total :</h1>
                    <span className='font-semibold  text-sm text-[#0ea5e9]'>{order.bills.totalWithTax}</span>
                    <span className='text-xs text-[#1f1f1f]'>AED </span>
                </div>
                <div className='flex gap-2 mt-2 items-center'>
                    <h1 className='text-[#1a1a1a] font-normal text-xs'>Payed :</h1>
                    <span className='font-semibold  text-sm text-[#0ea5e9]'>{order.bills.payed}</span>
                    <span className='text-xs text-[#1f1f1f]'>AED </span>
                </div>
                <div className='flex gap-2 mt-2 items-center'>
                    <h1 className='text-[#1a1a1a] font-normal text-xs'>Balance :</h1>
                    <span className='font-semibold  text-sm text-[#be3e3f] underline'>{order.bills.balance}</span>
                    <span className='text-xs text-[#1f1f1f]'>AED </span>
                </div>
            </div>
            
        </div>
    );
};


export default OrderCard


