import React, { useState, useEffect } from 'react'
import { TbHomeFilled } from "react-icons/tb";
import { MdReorder } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { CgMoreVertical } from "react-icons/cg";
import { FaFirstOrder } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";   
import { IoCarSport } from "react-icons/io5";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";
import { IoCloseCircle } from 'react-icons/io5';
import { PiMathOperationsLight } from "react-icons/pi";

import { useNavigate, useLocation } from 'react-router-dom';



const BottomNav = () => {

    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;
    const location = useLocation();


    const [isMoreModal, setIsMoreModal] = useState(false);
    const handleMoreOpen = () => {
        setIsMoreModal(true)
    }






    return (
        <div className='bg-linear-65 from-[#0ea5e9] to-sky-100 flex items-center justify-around  bottom-0 left-0 right-0 p-1 h-15 fixed'>

            <button onClick={() => navigate('/')} className={`w-[150px] shadow-lg/30 text-sm font-semibold rounded-sm h-10 flex items-center justify-center gap-1 cursor-pointer
                ${isActive('/') ? 'bg-white text-[#0ea5e9]' : 'text-white'}`}>
                <TbHomeFilled className='inline mr-1 text-sky-200' size={25} />
                <p className='mt-1'>Home</p>
            </button>
            <button onClick={() => navigate('/orders')} className={`w-[150px] shadow-lg/30 text-sm font-semibold rounded-sm h-10 flex items-center justify-center gap-1 cursor-pointer
                ${isActive('/orders') ? 'bg-white text-[#0ea5e9]' : 'text-white'}`}>
                <MdReorder className='inline mr-1 text-sky-200' size={25} />
                <p className='mt-1'>Orders</p>
            </button>

            <button onClick={() => navigate('/cars')} className={`w-[150px] shadow-lg/30 text-sm font-semibold rounded-sm h-10 flex items-center justify-center gap-1 cursor-pointer
                ${isActive('/cars') ? 'bg-white text-[#0ea5e9]' : 'text-[#0ea5e9]'}`}>
                <FaCar className='inline mr-1 text-sky-500' size={25} />
                <p className='mt-1'>Cars</p>
            </button>

            <button  
                onClick ={handleMoreOpen}

                className={`w-[150px] shadow-lg/30 text-sm font-semibold rounded-sm h-10 flex items-center justify-center gap-1 cursor-pointer
                ${isActive('') ? 'bg-white text-[#0ea5e9]' : 'text-[#0ea5e9] bg-sky-200'}`}>
                <CgMoreVertical className='inline mr-1 text-sky-500' size={25} />
                <p className='mt-1'>More</p>
            </button>

            <button
                onClick={() => navigate('/carbill')}
                className='bottom-1 text-[#0ea5e9] rounded-full p-3 items-center absolute cursor-pointer bg-white'>
                <FaFirstOrder size={25} />
            </button>


            
            {isMoreModal && (
                <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }} >
                    <div className='flex flex-col bg-sky- rounded-lg p-3 min-w-[300px]'>
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-[#f5f5f5] text-lg font-semibold'>More Options</h2>
                            <button onClick={()=> setIsMoreModal(false)} className='rounded-full  text-[#be3e3f] cursor-pointer'>
                                <IoCloseCircle size={25} />
                            </button>
                        </div>

                        <hr className= 'border-t-3 border-[#0ea5e9] mb-2'/>
                        <div className='flex flex-col gap-5 justify-between items-center px-8 mt-1'>
                            
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/customers'); }} 
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Customers
                                    <FaUsers className ='inline text-[#0ea5e9] w-8 h-5 '/>
                                </button>
                            </div>
                             <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/classes'); }} 
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Classes
                                    <MdOutlineFormatListNumberedRtl className ='inline text-[#0ea5e9] w-10 h-6 '/>
                                </button>
                            </div>
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/car'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Cars
                                    <IoCarSport className ='inline text-[#0ea5e9] w-10 h-6 ' />
                                </button>
                            </div>
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/transactions'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Transactions
                                    <PiMathOperationsLight className ='inline text-[#0ea5e9] w-10 h-6 ' />
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};


export default BottomNav