import React, { useState, useEffect } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack';
import { getCategories, getItems } from '../../https';
import { getBgColor } from '../../utils';
import { GrRadialSelected } from 'react-icons/gr';

import ItemsCard from './ItemsCard';
import { FcSearch } from "react-icons/fc";


const MenuContainer = () => {

    // fetch categories from DB :-
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


    // // fetch cars from Db :- past method
    const [searchTerm, setSearchTerm] = useState('');
    const { data: resData, isError} = useQuery({
        queryKey :['items',searchTerm],

        queryFn : async () => {
           return await getItems(searchTerm);
        },
        placeholderData: keepPreviousData,
    });
        if(isError) {
            enqueueSnackbar('Something went wrong!', { variant: 'error' })
        }
        console.log(resData); 



    // select items from categories
    const [selectedCategory, setSelectedCategory] = useState(`Sydan`)  // to select items from category Dynamic
    
    return (
        <>
           <div className='flex w-full gap-1 justify-start items-start p-2 '>
                <div className='flex-col justify-between  w-[15%] bg-white px-1 py-4 shadow-xl h-[calc(100vh-5rem-12rem)]'>
                    {responseData?.data.data.map(category => (

                        <button className='w-[100%] grid grid-cols-1 p-1 items-center  mb-3 rounded-lg h-[50px] cursor-pointer shadow-lg/30'
                            style={{ backgroundColor: getBgColor() }}
                            onClick={() => setSelectedCategory(category.name)}
                        >

                            <div className='flex items-center justify-between w-full shadow-lg/30 px-3'>
                                <h1 className='text-sm font-semibold text-white'>{category.name}</h1>
                                {selectedCategory === category.name && <GrRadialSelected className='text-[#e6e6e6]' size={20} />}
                            </div>
                        </button>
                    ))}
                </div>

                

                <div className=' flex flex-col justify-between items-center gap-1 w-full p-3  shadow-xl'> 
                    <div className='flex items-start justify-between flex-wrap gap-1 w-full px-2 py-2 rounded-lg overflow-y-scroll scrollbar-hidden '>

                        {
                            //selected?.items.map((item) =>  {  // Static
                            resData?.data.data.filter(i => i.category === selectedCategory).map((service) => { // Dinamic

                                return (   //flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer
                                    <ItemsCard id={service._id} name={service.name} status={service.status} carNo={service.carNo} price={service.price} cat={service.category} image={service.image} />

                                )
                            })
                        }


                    </div>

                </div>

           </div>
            
            
            
        </>
    );
};


export default MenuContainer


