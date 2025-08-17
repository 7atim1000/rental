import React from 'react'
import { IoCarSportSharp } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from '../../https';

import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../../redux/slices/userSlice';
import { MdDashboardCustomize } from "react-icons/md";
//<IoIosLogOut />


const Header = () => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: (data) => {
            console.log(data);
            dispatch(removeUser());
            navigate('/auth');
        },

        onError: (error) => {
            console.log(error);
        }
    });

    
    const handleLogOut = () => {
        // // Clear client-side cookie just in case
        // document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // logoutMutation.mutate();

        if (!logoutMutation.isLoading) {
            // Clear client-side cookie just in case
            document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            logoutMutation.mutate();
        }
    }

    return (
        <header className ='flex justify-between items-center py-1 px-8 bg-linear-65 from-[#0ea5e9] to-sky-100'>
            <div className ='flex items-center justify-content gap-2'>
                <IoCarSportSharp className ='h-12 w-12 text-white'/>
                <h1 className ='text-md font-semibold text-white'>Cars Rental</h1>
            </div>

            <div className ='flex items-center gap-4 bg-whi  p-2 w-[500px] rounded-[5px] text-white'>
                <FcSearch size={25}/>
                <input 
                   type ='text'
                   placeholder ='Search'
                   className ='text-white text-sm border-b border-sky-50 w-[350px]'
                />
            </div>


         


            <div className ='flex items-center gap-4'>
                <div>
                    {/**bell */}
                </div>

                { userData.role === 'Admin' && (
                    <div onClick={() => navigate('/dashboard')} className ='cursor-pointer p-2 rounded-[15px]'>
                        <MdDashboardCustomize className ='text-[#0ea5e9] font-bold ' size ={30}/>
                    </div>
                )}

                <div className ='flex items-center gap-3'>
                    <FaCircleUser className ='text-[#0ea5e9]' size={30}/>
        
                    <div className ='flex flex-col item-start font-normal'>
                    
                        <h1 className ='text-xs text-[#0ea5e9] font-semibold'>{userData.name || 'Username'}</h1>
                        <p className ='text-xs text-green-600'>{userData.role || 'Role'}</p>
                    </div>

                    <p className ='text-xs text-[#0ea5e9] ml-10'>Log out <RiLogoutCircleRLine
                        onClick ={handleLogOut}
                        className ='text-[#be3e3f] font-semibold inline cursor-pointer' size ={30}/>
                    </p>

                </div>

            </div>
        </header>
    );
};


export default Header;