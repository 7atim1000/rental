import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack';

import BottomNav from '../components/shared/BottomNav'

import BackButton from '../components/shared/BackButton'
import { MdDeleteForever, MdOutlineAddToDrive } from "react-icons/md";
import ClassAdd from '../components/classes/ClassAdd';
import { api, getCategories } from '../https';
import { getAvatarName, getBgColor } from '../utils';

import { toast } from 'react-toastify';


const Classes = () => {

    const buttons = [
        { label: "Add Class", icon: <MdOutlineAddToDrive className ='text-[#0ea5e9]' size={20} />, action: 'class' },
    ];

    const [isClassModalOpen, setIsClassModalOpen] = useState(false);

    const handleModalOpen = (action) => {
        if (action === 'class') setIsClassModalOpen(true)
    }

    // Fetch Categories
   
    const { data: responseData, IsError } = useQuery({
        queryKey: ['categories'],
    
        queryFn: async () => {
        return await getCategories();
        },
                    
        placeholderData: keepPreviousData,
        });

    
        if (IsError) {
            enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }

        console.log(responseData); 


        // remove category
        const removeCategory = async (id) => {
          
            try {
                const response = await api.post('/api/category/remove', { id }, )
        
            if (response.data.success){
        
            //Update the LIST after Remove
            toast.success(response.data.message)
            window.location.reload()
            
             
            
            
            } else{
              toast.error(response.data.message)
            }
        
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        }
        
    
        

    return (
        <section className ='h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>
            <div className ='flex items-center justify-between px-8 py-2 shadow-xl'>
                
                <div className ='flex items-center'>
                    <BackButton />
                    <h1 className ='text-lg font-semibold text-[#1f1f1f]'>Classes Menu</h1>
                </div>
                <div className ='flex items-center justify-around gap-3 hover:bg-[#0ea5e9] shadow-lg/30 '>
                      {buttons.map(({ label, icon, action}) => {
                        
                        return(
                            <button 
                            onClick = {() => handleModalOpen(action)}
                            className ='cursor-pointer bg-white 
                             px-5 py-2 rounded-full text-[#1a1a1a] font-semibold text-xs flex items-center gap-2'> 
                                {label} {icon}
                            </button>
                        )
                        })}
                </div>
                
                {isClassModalOpen && <ClassAdd setIsClassModalOpen={setIsClassModalOpen} />}
            </div>

            
            
            <div className ='grid grid-cols-5 gap-4 px-10 py-4 mt-0 w-[100%] rounded-lg'>
                {/* {categories.map(category => (  */}
                {responseData?.data.data.map(category => ( 
                                   
                <div key={category.name} className ='flex  flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer'
                    style = {{backgroundColor : getBgColor()}}
                >
                          
                    <div className ='flex items-center justify-between w-full shadow-lg/30'>
                        <div className = 'flex items-center justify-between gap-2 px-2'>
                            <h1 className ='text-md font-semibold text-[#f5f5f5]'>{category.name}</h1> 
                            <button className ='bg-white text-[#0ea5e9] border-b-3 border-[#0ea5e9] text-md font-semibold rounded-full shadow-lg w-[30px] h-[30px] my-0'>
                                {getAvatarName(category.name)}</button>   
                        </div>
                        <div className ='flex items-center p-2'>
                            <MdDeleteForever onClick={()=>removeCategory(category._id)} 
                            className ='w-5 h-5 text-[#be3e3f] rounded-full bg-white shadow-lg/30'/>  
                        </div>
                                             
                    </div>
                </div>
                     
                ))} 

                <BottomNav />            
            </div>   

            

        </section>
    )
}

export default Classes;