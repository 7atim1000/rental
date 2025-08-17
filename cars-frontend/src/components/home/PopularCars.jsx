import React , {useState, useEffect}  from 'react'
import { api } from '../../https';

const  PopularCars = () => {
    
    const [cars, setCars] = useState([]);
    const [name, setName] = useState('all');
    const [category, setCategory] = useState('all');
    const [status, setStatus] = useState('all');

    const [search, setSearch] = useState('');
    // const [sort, setSort] = useState('-createdAt');

    const fetchCars = async () => {
        try {
            // Request all records by setting a high limit and ignoring other parameters
            const res = await api.post('/api/item/fetch', {

                name: 'all',      // Ignore filtering by employee name
                category,         // with filtering by department
                status: "all",

                search: '',       
                sort: '-createdAt',         // No sorting
                page: 1,          // First page
                limit: 1000       // Large number to get all records
            });

            // Use whichever property your backend returns the data in
            setCars(res.data.data || res.data.items || []);

        } catch (error) {
            console.error('Error fetching cars menu.', error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []); 


    return (
       <div className='' >
            <div className='bg-white w-full rounded-lg items-center h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden shadow-xl'>
                
                <div className='flex justify-between items-center px-6 py-2 w-[100%] shadow-xl'>
                    <h1 className='text-[#1a1a1a] text-md font-semibold tracking-wide'>Popular Cars Menu</h1>
                    {/* <a className='text-[#025cca] text-sm font-semibold'>View all</a> */}
                </div>
                
                <div className= ''>
                    {
                        cars.map((car) => {
                            return (
                                <div key={car._id} className= 'flex items-center gap-4 bg-white rounded-[15px] px-2 py-1 mx-2 mt-2 shadow-lg/30 cursor-pointer hover:bg-[#f5f5f5]'>
                                    {/* <h1 className='text-[#02ca3a] font-bold text-sm mr-4' >{dish._id < 10 ? `0${dish._id}` : dish._id}</h1> */}
                                    <img src={car.image} alt={car.name} className='w-[45px] h-[45px] rounded-full border-b-3 border-[#0ea5e9]' />
                                    <div>
                                        <h1 className='text-[#1a1a1a] font-semibold mt-1 tracking-wide'>{car.name}</h1>
                                        <p className='text-[#F6B100] text-lg font-semibold mt-1'>
                                            <span className='text-sky-500 text-sm'>Offer : </span>
                                            {car.price}
                                            <span className ='text-xs font-normal text-sky-500'> AED</span>
                                            
                                            </p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                

            </div>
       </div>
    )
}

export default PopularCars ;