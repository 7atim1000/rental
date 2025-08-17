import React ,{useState, useEffect} from 'react'
import { motion } from 'framer-motion'

import { IoCloseCircle } from 'react-icons/io5';
import { IoMdArrowDropright } from "react-icons/io";
import { PiUserCircleCheckLight } from "react-icons/pi";
import { FcSearch } from 'react-icons/fc'
import { BsCalendar2Date } from "react-icons/bs";

import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { enqueueSnackbar } from 'notistack';
import { setCustomer } from '../../redux/slices/customerSlice';
import { api } from '../../https';


const SelectCustomer = ({setIsSelectCustomer}) => {


    const dispatch = useDispatch();

    const handleClose = (customerId, customerName, email, contactNo, balance, licenseNo) => {
        dispatch(setCustomer({ customerId, customerName, email, contactNo, balance, licenseNo }));
        setIsSelectCustomer(false);
    };

    // Fetch and search 
    const [list, setList] = useState([]);
    
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    
    const [sort, setSort] = useState('-createdAt');

    const fetchCustomers = async () => {
        try {
            const res = await api.post('/api/customer/fetch', {
                search,
                sort,         // No sorting
                page: 1,          // First page
                limit: 1000       // Large number to get all records
            });

            // Use whichever property your backend returns the data in
            setCustomers(res.data.data || res.data.customers || []);
        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        }
    }




    //Initial fetch
    useEffect(() => {
        fetchCustomers();
    }, [search]);

    
    return(
        
       <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor:  'rgba(6, 76, 133, 0.4)'}}>

           <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ durayion: 0.3, ease: 'easeInOut' }}
               className='bg-white p-2 rounded-lg shadow-lg/30 w-180 h-[calc(100vh-5rem)] md:mt-5 mt-5 
                
               border-b-2 border-[#0ea5e9]'
           >


               {/*Modal Header */}
               <div className="flex justify-between items-center mb-4 gap-5 shadow-xl p-2">
                    <h2 className='text-sm font-semibold underline text-sky-600'>Please select customer </h2>
                      

                   <button onClick={()=> setIsSelectCustomer(false)} className='rounded-sm text-[#be3e3f] hover:bg-[#be3e3f]/30 cursor-pointer border-b border-[#be3e3f]'>
                       <IoCloseCircle size={25} />
                   </button>
               </div>

                {/*SEARCH*/}
                <div className='flex items-center gap-4 bg-sky-50 text-[#1a1a1a] p-1 w-full shadow-xl'>
                    <FcSearch className='text-sky-600' />
                     <input
                            type='text'
                            placeholder="Search by customer name..."
                            className='bg-transparent outline-none text-[#1a1a1a] w-full border-b-1 border-[#0ea5e9] p-1 text-xs font-normal'

                            value ={search}
                            onChange ={(e) => setSearch(e.target.value)}
                        />
                </div>

                {/*Modal Body*/}
                <div className='mt-2 bg-white'>


                    <div className='overflow-x-auto bg-white shadow-xl'>
                        <table className='text-left w-full'>
                            <thead className=''>
                                <tr className='border-b-1 border-[#0ea5e9] text-xs font-normal text-[#1a1a1a]'>
                                    <th className='p-1'>Name</th>
                                    <th className='p-1'>Email</th>
                                    <th className='p-1'>Contact No</th>
                                    <th className='p-1'>Address</th>
                                    <th className='p-1'>ID</th>
                                    <th className='p-1'>license</th>
                                    <th className ='p-1'></th><th className ='p-1'></th>
                                </tr>
                            </thead>

                            <tbody>

                                {customers.map((customer, index) => (
                                        <tr
                                            // key ={index}
                                            className='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a]'
                                        >
                                            <td className='p-1' hidden>{customer._id}</td>
                                            <td className='p-1'>{customer.customerName}</td>
                                            <td className='p-1'>{customer.email}</td>
                                            <td className='p-1'>{customer.contactNo}</td>
                                            <td className='p-1'>{customer.address}</td>
                                            <td className='p-1'>{customer.idNo}</td>
                                            <td className='p-1'>{customer.licenseNo}</td>

                                            <td className={`p-1 ${customer.balance === 0 ? 'text-sky-600' : 'text-[#be3e3f]'} text-xs font-bold`}>  {(Number(customer.balance) || 0).toFixed(2)}</td>
                                            <td className='p-2'>

                                                <button className={`cursor-pointer text-sm font-semibold`}>
                                                    <PiUserCircleCheckLight size={20} className='w-7 h-7 text-green-600 rounded-full   flex justify-end'
                                                        onClick={() => handleClose(customer._id, customer.customerName, customer.email, 
                                                        customer.contactNo, customer.balance, customer.idNo, customer.licenseNo)} />
                                                </button>

                                            </td>

                                        </tr>

                                    ))}


                            </tbody>
                        </table>

                    </div>
                </div>





            </motion.div>  
        </div>
    );
};


export default SelectCustomer ;