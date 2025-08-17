import React, { useState, useEffect } from 'react' 
import BottomNav from '../components/shared/BottomNav';
import BackButton from '../components/shared/BackButton';
import CarsCard from '../components/cars/CarsCard';

import { toast } from 'react-toastify'
import { api, getCategories } from '../https';

import { keepPreviousData, useQuery } from '@tanstack/react-query'

const Cars = () => {

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
    



    // const Status = [
    //  {name: 'Booked' , id:1}, {name: 'Available' , id:1}
    // ];

  

    return (
        <section className ='bg-white h-[calc(100vh)]  gap-3 overflow-y-scroll scrollbar-hidden'>
            <div className ='flex items-center justify-between px-8 py-3 shadow-xl mb-2'>
                <div className ='flex items-center'>
                    <BackButton />
                   <h1 className ='font-semibold text-md text-[#1a1a1a]'>Cars</h1>
                </div>

                <div className='flex items-center justify-around gap-4'>
                    <button onClick={() => setStatus('all')}
                        className={`shadow-lg/30 text-sm cursor-pointer px-3 py-1 rounded-sm ${status === 'all' ? 'bg-[#0ea5e9] text-[#f5f5f5]' : ' bg-[#f5f5f5] text-[#0ea5e9]'} }`}
                    >
                        All
                    </button>
                    <button onClick={() => setStatus('Available')}
                        className={`shadow-lg/30 text-sm cursor-pointer px-3 py-1 rounded-sm ${status === 'Available' ? 'bg-[#0ea5e9] text-[#f5f5f5]' : ' bg-[#f5f5f5] text-[#0ea5e9]' }`}
                    >
                        Available
                    </button>
                    <button onClick={() => setStatus('Rented')}
                        className={`shadow-lg/30 text-sm cursor-pointer px-3 py-1 rounded-sm ${status === 'Rented' ? 'bg-[#0ea5e9] text-[#f5f5f5]' : ' bg-[#f5f5f5] text-[#0ea5e9]' }`}
                    >
                        Rented
                    </button>

                </div>  
           
            </div>


            {/* <div className ='px-10 py-4 flex flex-wrap gap-6 items-center  overflow-y-scroll scrollbar-hidden  mt-0'>
                {carData.filter(i => i.status === selectedStatus).map((car) => {
                              
                return (   //flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer
                <CarsCard id={car._id} carName={car.serviceName} carNo={car.serviceNo} category ={car.category} color={car.color} status={car.status} />
                    
                    )
                })}
            </div> */}
            <div className='flex w-full items-start justify-start flex-wrap gap-2 px-2 py-1 bg-white overflow-y-scroll scrollbar-hidden  h-[calc(100vh-9rem)]'>
                {
                    list.map((car, index) => (

                        <CarsCard 
                            id={car._id} category={car.category}
                            name ={car.name} carNo ={car.carNo}
                            color ={car.color} price ={car.price}
                            status ={car.status} image ={car.image}
                        // image ={}
                        />
                    ))}

            </div>



            <BottomNav />
        </section>

        
    );
};


export default Cars