import React, { useState } from 'react'
import BackButton from '../components/shared/BackButton';
import { useNavigate } from 'react-router-dom'


import { MdCategory } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { ImUsers } from "react-icons/im";


const Dashboard = () => {
    
    const navigate = useNavigate();
    
    const buttons = [
        { label: "Classes", icon: <MdCategory className ='text-sky-500' size={20} />, action: 'class' },
        { label: 'Cars', icon: <FaList className ='text-sky-500' size={20} />, action: 'items'},
        { label: 'Customers',  icon: <ImUsers className ='text-sky-500' size={20} />, action: 'customers'}
    ];

    const handleOpenPage = (action) => {
        if (action === 'class') navigate('/classes')
        if (action === 'items') navigate('/services')
        if (action === 'customers') navigate('/customers')
    }

    return (

        <div className ='bg-white h-[calc(100vh-5rem)]'>
            <div className ='container mx-5 flex items-center justify-between py-5 px-6 md:px-0'>
                
                <div className ='flex items-center gap-5'>
                    <BackButton />

                    
                    {buttons.map(({ label, icon, action}) => {
                        
                        return(
                            <button 
                            onClick = {() => handleOpenPage(action)}
                            className ='shadow-lg cursor-pointer bg-blue-100 hover:bg-blue-200 hover:text-blue-500
                            px-5 py-2 rounded-lg text-blue-500 font-semibold text-sm flex items-center gap-2'
                            > 
                                {label} {icon}
                            </button>
                        );
                        })}

                </div>

            </div>

        </div>

    );
};


export default Dashboard ;