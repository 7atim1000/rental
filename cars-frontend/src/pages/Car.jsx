import React , { useState, useRef, useEffect } from 'react' ;
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { MdDeleteForever, MdOutlineAddToDrive } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { BsDatabaseAdd } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import { IoIosRefresh } from "react-icons/io";

import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import BackButton from '../components/shared/BackButton';
import BottomNav from '../components/shared/BottomNav';
import { api, getCategories } from '../https';

import { getAvatarName, getBgColor } from '../utils';
import AddCar from '../components/cars/AddCar';
import EditCar from '../components/cars/EditCar';


const Car = () => {
    
    const Button = [{ label: 'New Car', icon: <MdOutlineAddToDrive className='text-[#0ea5e9]' size={20} />, action: 'car' }];
    const [isAddCarModal, setIsAddCarModal] = useState(false);

    const handleAddCarModal = (action) => {
        if (action === 'car') setIsAddCarModal(true);
    }; 


 // fetch 
    const [list, setList] = useState([]);
    
    const [search, setSearch] = useState(''); // Match backend parameter name
    const [sort, setSort] = useState('-createdAt');
    
    const [category, setCategory] = useState('all');
    const [name, setName] = useState('all');
    const [status, setStatus] = useState('all')

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1
    });


    const [isEditCarModal, setIsEditCarModal] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);

    const fetchCars = async (search = '') => {
        try {

            const response = await api.post('/api/item/fetch',
                {
                    name,
                    status,
                    category,

                    search,
                    sort,

                    page: pagination.currentPage,
                    limit: pagination.itemsPerPage
                }
            );

            if (response.data.success) {
                //setList(response.data.employees)
                setList(response.data.data || response.data.cars || []);

                // Only update pagination if the response contains valid data
                if (response.data.pagination) {
                    setPagination(prev => ({
                        ...prev,  // Keep existing values
                        currentPage: response.data.pagination.currentPage ?? prev.currentPage,
                        itemsPerPage: response.data.pagination.limit ?? prev.itemsPerPage,
                        totalItems: response.data.pagination.total ?? prev.totalItems,
                        totalPages: response.data.pagination.totalPages ?? prev.totalPages
                    }));
                }


            } else {
                toast.error(response.data.message || 'Cars is not found')
            }

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

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetchCars();
        }
    }, [name, status, category, search, sort, pagination.currentPage, pagination.itemsPerPage]);

    // Edit car
    const handleEdit = (car) => {
        setCurrentCar(car);
        setIsEditCarModal(true);
    };


    
    // Removing
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);    // for remove
    const [selectedCar, setSelectedCar] = useState(null);   // for remove

    const removeCar = async (id) => {

        try {
            const response = await api.post('/api/item/remove', { id },)
            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchCars();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    
    // search - sorting - Debounce search to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCars(search);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [search, sort]);

    // Initial fetch
    useEffect(() => {
        fetchCars();
    }, []);


    // Fetch Classes  
    const { data: resData, IsError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await getCategories();
        },
        placeholderData: keepPreviousData,
    });

    if (IsError) {
        toast.error('Something went wrong!');
    };


    // pagination
    const PaginationControls = () => {

        const handlePageChange = (newPage) => {
            setPagination(prev => ({
                ...prev,
                currentPage: newPage
            }));
        };

        const handleItemsPerPageChange = (newItemsPerPage) => {
            setPagination(prev => ({
                ...prev,
                itemsPerPage: newItemsPerPage,
                currentPage: 1  // Reset to first page only when items per page changes
            }));
        };


        return (  //[#0ea5e9]
            <div className="flex justify-between items-center mt-2 py-2 px-5 bg-white shadow-lg/30 rounded-lg
            text-xs font-medium border-b border-[#0ea5e9] border-t border-[#0ea5e9]">
                <div>
                    Showing
                    <span className='text-[#0ea5e9]'> {list.length} </span>
                    of
                    <span className='text-[#0ea5e9]'> {pagination.totalItems} </span>
                    records
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-2 py-1 shadow-lg/30 border-b border-[#0ea5e9]
                        text-xs font-normal disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="px-3 py-1">
                        Page
                        <span className='text-[#0ea5e9]'> {pagination.currentPage} </span>
                        of
                        <span className='text-[#0ea5e9]'> {pagination.totalPages} </span>
                    </span>

                    <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-2 py-1 shadow-lg/30 border-b border-[#0ea5e9] text-xs font-normal disabled:opacity-50"
                    >
                        Next
                    </button>

                    <select
                        value={pagination.itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="border-b border-[#0ea5e9] px-2 font-normal shadow-lg/30"
                    >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                    </select>
                </div>
            </div>
        );
    };



    return (
        <section className='flex gap-3 bg-[#f5f5f5] shadow-xl h-[calc(100vh-3rem)] overflow-y-scroll scrollbar-hidden'>

            {/* Left sidebar - Departments */}
            <div className='flex-1 bg-white h-[100%] overflow-hidden flex flex-col'>

                <div className='overflow-y-auto scrollbar-hidden flex-1'>
                    {resData?.data.data.map(category => (
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



            <div className='flex-7 h-full bg-white overflow-y-scroll scrollbar-hidden'>
                <div className='flex items-center justify-between px-8 py-1 shadow-xl'>
                    <div className='flex items-center'>
                        <BackButton />
                        <h1 className='text-lg font-semibold text-[#1f1f1f]'>Cars Management</h1>
                    </div>

                    <div className='flex gap-2 items-center justify-around gap-3 hover:bg-[#0ea5e9] shadow-lg/30'>
                       
                        {Button.map(({ label, icon, action }) => {
                            return (
                                <button

                                    onClick={() => handleAddCarModal(action)}

                                    className='bg-white px-4 py-2 text-[#1a1a1a] cursor-pointer
                                        font-semibold text-xs flex items-center gap-2 rounded-full'>
                                    {label} {icon}
                                </button>
                            )
                        })}
                    </div>

                {isAddCarModal && <AddCar setIsAddCarModal={setIsAddCarModal} />}

                </div>

                {/* Search and sorting */}
                <div className="flex items-center px-15 py-2 shadow-xl">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="border border-[#0ea5e9] p-1 rounded-lg w-full text-xs font-semibold"
                        // max-w-md
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* Optional: Sort dropdown */}
                    <select
                        className="ml-4 border border-[#0ea5e9] p-1  rounded-lg text-[#1f1f1f text-xs font-semibold]"
                        value={sort}

                        onChange={(e) => {
                            setSort(e.target.value);
                            setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when changing sort
                        }}
                    >
                        <option value="-createdAt">Newest First</option>
                        <option value="createdAt">Oldest First</option>
                        <option value="name">By name (A-Z)</option>
                        <option value="name">By name (Z-A)</option>
                        <option value="category">By classes (A-Z)</option>
                    </select>
                </div>

                <div className='mt-1 ' >
                    <div className='h-full overflow-x-auto mx-5 '>
                        <table className='w-[100%] text-left ' >
                            <thead className='bg-white border-b-3 border-[#0ea5e9] text-xs font-normal text-[#0ea5e9]'>
                                <tr> {/**bg-[#D2B48C] */}
                                    
                                    <th className ='p-1'></th>
                                    <th className ='p-1'></th>
                                    <th className='p-1'>Name</th>
                                    <th className='p-1'>Car No</th>
                                    <th className='p-1'>Color</th>
                                    <th className='p-1'>Price</th>
                                    <th className='p-1'></th>
                            
                                    <th className='p-1' style={{ marginRight: '0px' }}></th>
                                </tr>
                            </thead>

                            <tbody>

                                {list.length === 0
                                    ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your cars list is empty . Start adding car !</p>)
                                    : list.map((car, index) => (

                                        <tr
                                            // key ={index}
                                            className='border-b-3 border-[#f5f5f5] text-xs font-normal'
                                        >
                                            <td className='p-1' hidden>{car._id}</td>
                                            <td className='p-1 bg-sky-100'>{car.category}</td>
                                            <td className='p-1'><img className='rounded-full border-b-2 border-[#0ea5e9] w-9 h-9' src={car.image} /></td>
                                            <td className='p-1'>{car.name}</td>
                                            <td className='p-1'>{car.carNo}</td>
                                            <td className='p-1'>{car.color}</td>
                                            <td className='p-1'>{car.price}</td>

                                            <td className='p-1  flex flex-wrap gap-2  justify-center bg-zinc-1' style={{ marginRight: '0px' }}>
            
                                                <button className={`cursor-pointer text-sm font-semibold hover:bg-[#0ea5e9]/30 p-1`}>
                                                    <LiaEditSolid

                                                        onClick={() => handleEdit(car)}
                                                        size={20}
                                                        className='w-5 h-5 text-[#0ea5e9] rounded-full ' />
                                                </button>

                                                <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold hover:bg-[#be3e3f]/30`}>
                                                    <MdDeleteForever
                                                        onClick={() => { setSelectedCar(car); setDeleteModalOpen(true); }}
                                                        size={20}
                                                        className='w-5 h-5 text-[#be3e3f] rounded-full' />
                                                </button>

                                            </td>

                                        </tr>
                                    ))}
                            </tbody>

                            {/* Footer Section */}
                            {list.length > 0 && (
                                <tfoot className='bg-[#0ea5e9] text-white border-t-2 border-[#0ea5e9] text-xs font-semibold'>
                                    <tr>
                                        <td className='p-2' colSpan={5}>{list.length} Car</td>
                                        <td className='p-2 text-left'>
                                        </td>
                                        <td className='p-2 text-left text-[#be3e3f]'>

                                        </td>
                                        <td className='p-2 text-left text-sky-600 text-md'>

                                        </td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tfoot>
                            )}

                        </table>

                        {/* Pagination  */}
                        {list.length > 0 && <PaginationControls />}

                    </div>

                    {/* Edit Employee Modal */}
                    {isEditCarModal && currentCar && (
                        <EditCar
                            car= {currentCar}
                            setIsEditCarModal= {setIsEditCarModal}
                            fetchCars= {fetchCars}
                        />
                    )}


                </div>

            </div>

            <BottomNav />

            {/* Place the ConfirmModal here */}
            <ConfirmModal
                open= {deleteModalOpen}
                carName= {selectedCar?.name}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeCar(selectedCar._id);
                    setDeleteModalOpen(false);
                }}
            />

        </section>
    );
};


// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, carName }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-[#be3e3f]">{carName}</span> ?</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-[#be3e3f] text-white cursor-pointer"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>

        </div>
    );
};



export default Car;