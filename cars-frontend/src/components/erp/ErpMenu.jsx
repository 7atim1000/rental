import React from 'react'
import { HiMiniUsers } from "react-icons/hi2";
import { FaUsersGear } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { FaUsersRays } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { CiCalculator2 } from "react-icons/ci";
import { FaStoreAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const ErpMenu = () => {
    return (
        <div className ='flex flex-wrap justify-beween gap-4'>

            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <HiMiniUsers className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Users</p>
                </button>
            </div>


            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <FaUsersRays className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Customers</p>
                </button>
            </div>
            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <TbUsersGroup className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Suppliers</p>
                </button>
            </div>

            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <FaUsersGear className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Employees</p>
                </button>
            </div>


            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <BiCategoryAlt className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Categories</p>
                </button>
            </div>
            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <BsListStars className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'> Items</p>
                </button>
            </div>
            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <LiaFileInvoiceDollarSolid className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Invoices</p>
                </button>
            </div>
            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <FaStoreAlt className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Stores</p>
                </button>
            </div>
            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <CiCalculator2 className ='text-sky-600' size={25}/>
                    <p className ='text-sm font-semibold'>Financials</p>
                </button>
            </div>
            
            <div className ='w-[120px] h-[90px] bg-white p-4 rounded-lg mb-4 shadow-xl/30 flex justify-center cursor-pointer'>
                <button className ='flex flex-col gap-2 items-center'>
                    <AiOutlineLogout  className ='text-red-600' size={25}/>
                    <p className ='text-sm font-semibold'>Logout</p>
                </button>
            </div>
            
        </div>
        
    );
};



export default ErpMenu ;