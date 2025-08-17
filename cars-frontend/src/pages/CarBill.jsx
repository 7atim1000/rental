import React, { useState, useEffect } from 'react' 
import BottomNav from '../components/shared/BottomNav';
import BackButton from '../components/shared/BackButton';

import { toast } from 'react-toastify'
import { api, getCategories } from '../https';


import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAvatarName, getBgColor } from '../utils';
import CarsBillCard from '../components/menu/CarsBillCard';

const CarBill = () => {

    // fetch 
    const [list, setList] = useState([]);

    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const fetchCars = async () => {
      try {
        // Request all records by setting a high limit and ignoring other parameters
        const res = await api.post('/api/item/fetch', {
    
          name: 'all',      // Ignore filtering by employee name
          category,         // with filtering by department
          status,
          //search: '',     // Empty search string No searching
          search,
          sort: '',         // No sorting
          page: 1,          // First page
          limit: 1000       // Large number to get all records
        });
    
        // Use whichever property your backend returns the data in
        setList(res.data.data || res.data.cars || []);
        
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast.error(error.message);
      }
    };
    
    useEffect(() => {
      fetchCars();
    }, [category, search, status]); 
    
    
    // Fetch Classes
    const { data: responseData, IsError } = useQuery({

        queryKey: ['departments'],
        queryFn: async () => {
            return await getCategories();
        },

        placeholderData: keepPreviousData,
    });


    if (IsError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
    
        console.log(responseData);
    

    return (
        <section className ='flex gap-3 bg-[#f5f5f5] shadow-xl h-[calc(100vh)] overflow-y-scroll scrollbar-hidden'>
            
            <div className ='flex-[1] h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-white'>

                <div className='overflow-y-auto scrollbar-hidden flex-1'>
                    {responseData?.data.data.map(category => (
                        <div className='flex items-center justify-between gap-1 px-0 mx-1 mb-2 bg-white shadow-xl'>
                            <button
                                className='mx-auto items-center w-[90%] p-3 cursor-pointer text-[#1a1a1a] 
                                    rounded-lg font-semibold text-sm flex items-center gap-2'
                                onClick={() => setCategory(category.name)}
                            >
                                {category.name}
                            </button>
                            <button className='text-[#f5f5f5] text-md font-semibold rounded-full shadow-lg w-[50px] h-[40px] my-1'
                                style={{ backgroundColor: getBgColor() }}
                            >
                                {getAvatarName(category.name)}
                            </button>
                        </div>
                    ))}
                </div>
         

            </div>


            <div className ='flex-[7] h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-white'>
                
                <div className='flex items-center justify-between px-8 py-3 shadow-xl'>
                    <div className='flex items-center'>
                        <BackButton />
                        <h1 className='font-semibold text-md text-[#1a1a1a]'>Cars</h1>
                    </div>

                    <div className='flex items-center justify-around gap-4'>
                        <button onClick={() => setStatus('all')}
                            className={`shadow-lg/30 text-sm cursor-pointer px-3 py-1 rounded-sm ${status === 'all' ? 'bg-[#0ea5e9] text-[#f5f5f5]' : ' bg-[#f5f5f5] text-[#0ea5e9]'} }`}
                        >
                            All
                        </button>
                        <button onClick={() => setStatus('Available')}
                            className={`shadow-lg/30 text-sm cursor-pointer px-3 py-1 rounded-sm ${status === 'Available' ? 'bg-[#0ea5e9] text-[#f5f5f5]' : ' bg-[#f5f5f5] text-[#0ea5e9]'}`}
                        >
                            Available
                        </button>
                        <button onClick={() => setStatus('Rented')}
                            className={`shadow-lg/30 text-sm cursor-pointer px-3 py-1 rounded-sm ${status === 'Rented' ? 'bg-[#0ea5e9] text-[#f5f5f5]' : ' bg-[#f5f5f5] text-[#0ea5e9]'}`}
                        >
                            Rented
                        </button>

                    </div>

                </div>

                <div className='mt-1 flex w-full items-start justify-start flex-wrap gap-2 px-2 py-1 bg-white overflow-y-scroll scrollbar-hidden  h-[calc(100vh-9rem)]'>
                {
                    list.map((car, index) => (
                        <CarsBillCard 
                            id={car._id} category={car.category}
                            name ={car.name} carNo ={car.carNo}
                            color ={car.color} price ={car.price}
                            status ={car.status} image ={car.image}
                            bookedBy ={car.bookedBy}
                            dateReturn = {car.dateReturn}
                        />
                    ))}

            </div>


            </div>
           


            <BottomNav />
        </section>

        
    );
};


export default CarBill