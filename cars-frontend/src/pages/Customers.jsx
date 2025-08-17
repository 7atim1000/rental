import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../redux/slices/customerSlice';
import { toast } from 'react-toastify';
import BackButton from '../components/shared/BackButton';
import BottomNav from '../components/shared/BottomNav';

import { MdDeleteForever, MdOutlineAddToDrive } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { PiListMagnifyingGlassFill } from "react-icons/pi";

import { FaCcAmazonPay } from "react-icons/fa";

import CustomerAdd from '../components/customers/CustomerAdd';
import { api } from '../https';
import CustomerPayment from '../components/customers/CustomerPayment';
import OrdersDetails from '../components/customers/OrdersDetails';

const Customers = () => {

    const dispatch = useDispatch();

    const Button = [
        { label: 'New Customer', icon: <MdOutlineAddToDrive className='text-[#0ea5e9]' size={20} />, action: 'customer' }
    ]

    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    const handleOpenModal = (action) => {
        if (action === 'customer') setIsCustomerModalOpen(true);
    }

    // fetch customers
    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('-createdAt');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1
    });


    const fetchCustomers = async (search = '') => {
        try {
            const response = await api.post('/api/customer/fetch',
                {
                    search,
                    sort,
                    page: pagination.currentPage,
                    limit: pagination.itemsPerPage
                }
            );

            if (response.data.success) {
                setList(response.data.customers || response.data.data || []);
                if (response.data.pagination) {
                    setPagination(prev => ({
                        ...prev,  // Keep existing values
                        currentPage: response.data.pagination.currentPage ?? prev.currentPage,
                        itemsPerPage: response.data.pagination.limit ?? prev.itemsPerPage,
                        totalItems: response.data.pagination.total ?? prev.totalItems,
                        totalPages: response.data.pagination.totalPages ?? prev.totalPages
                    }));
                };


            } else {
                toast.error(response.data.message || 'Empty customers list')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetchCustomers();
        }
    }, [search, sort, pagination.currentPage, pagination.itemsPerPage]);



    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const removeCustomer = async (id) => {

        try {
            const response = await api.post('/api/customer/remove', { id },)

            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchCustomers();

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
            fetchCustomers(search);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [search, sort]);

    // Initial fetch
    useEffect(() => {
        fetchCustomers();
    }, []);


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



    const detailsButton = [
        { label: '', icon: <PiListMagnifyingGlassFill className='text-green-600' size={20} />, action: 'details' }
    ]

    const [isDetailsModal, setIsDetailsModal] = useState(false);

    const handleDetailsModal = (customerId, customerName, balance, action) => {
        dispatch(setCustomer({ customerId, customerName, balance }));
        if (action === 'details') setIsDetailsModal(true);
    };


    const paymentButton = [
        { label: '', icon: <FaCcAmazonPay className='text-sky-600' size={20} />, action: 'payment' }
    ]

    const [isPaymentModal, setIsPaymentModal] = useState(false);

    const handlePaymentModal = (customerId, customerName, email, contactNo, balance, action) => {
        dispatch(setCustomer({ customerId, customerName, email, contactNo, balance }));
        if (action === 'payment') setIsPaymentModal(true);
    };

    return (
        <section className='h-[calc(100vh-3rem)] overflow-y-scroll scrollbar-hidden'>

            <div className='flex justify-between items-center px-5 py-2 shadow-xl'>
                <div className='flex items-center'>
                    <BackButton />
                    <h1 className='text-lg font-semibold text-[#1f1f1f]'>Customers Management</h1>
                </div>

                <div className='flex gap-2 items-center justify-around gap-3 hover:bg-[#0ea5e9] shadow-lg/30'>
                    {Button.map(({ label, icon, action }) => {
                        return (
                            <button className='bg-white px-4 py-2 text-[#1a1a1a] cursor-pointer
                                        font-semibold text-xs flex items-center gap-2 rounded-full'
                                onClick={() => handleOpenModal(action)}
                            >
                                {label} {icon}
                            </button>
                        )
                    })}

                </div>
            </div>



            <div className='mt-2 bg-white py-1 px-10' >

                <div className='overflow-x-auto bg-white'>
                    <table className='text-left w-full'>
                        <thead>
                            <tr className='border-b-3 border-[#0ea5e9] text-xs font-normal text-[#1a1a1a]'>
                                <th className='p-1'>Name</th>
                                <th className='p-1'>Email</th>
                                <th className='p-1'>Contact No</th>
                                <th className='p-1'>Address</th>
                                <th className='p-1'>ID</th>
                                <th className='p-1'>License</th>
                                <th className='p-1'>Balance</th>

                                <th className='p-1' style={{ marginRight: '0px' }}></th>
                            </tr>
                        </thead>

                        <tbody>

                            {list.length === 0
                                ? (<p className='ml-5 mt-5 text-xs font-medium text-[#be3e3f] flex items-start justify-start'>Your customers list is empty . Start adding customers !</p>)
                                : list.map((customer, index) => (

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
                                        <td className={`p-1 ${customer.balance === 0 ? 'text-green-600' : 'text-[#be3e3f]'}`}>
                                            {customer.balance.toFixed(2)}
                                            <span className='text-[#1a1a1a] font-normal'> AED</span>
                                        </td>


                                        <td className='p-1  flex flex-wrap gap-5  justify-center bg-zinc-1' style={{ marginRight: '0px' }}>

                                            <button className={`cursor-pointer text-sm font-semibold `}>
                                                <LiaEditSolid size={20} className='w-5 h-5 text-sky-600 rounded-full hover:bg-[#0ea5e9]/30' 
                                                // onClick={() => setIsItemEditModalOpen(true)}
                                                
                                                />
                                            </button>

                                            <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold `}>
                                                <MdDeleteForever
                                                    onClick={() => { setSelectedCustomer(customer); setDeleteModalOpen(true); }}
                                                    size={20}
                                                    className='w-5 h-5 text-[#be3e3f] rounded-full hover:bg-[#be3e3f]/30' />
                                            </button>


                                            {detailsButton.map(({ label, icon, action }) => {

                                                return (
                                                    <button className='cursor-pointer 
                                                py-2 rounded-lg text-green-600 font-semibold text-sm '
                                                        onClick={() => handleDetailsModal(customer._id, customer.customerName, customer.balance, action)}
                                                    >
                                                        {label} {icon}
                                                    </button>
                                                )
                                            })}


                                            {paymentButton.map(({ label, icon, action }) => {

                                                return (
                                                    <button className='cursor-pointer 
                                               py-2 rounded-lg text-[#0ea5e9] text-xs font-semibold text-sm flex items-center gap-2'
                                                        onClick={() => handlePaymentModal(customer._id, customer.customerName, customer.email, customer.contactNo, customer.balance, action)}
                                                    >
                                                        {label} {icon}
                                                    </button>
                                                )
                                            })}

                                        </td>
                                    </tr>
                                ))}
                        </tbody>

                        {/* Footer Section */}
                        {list.length > 0 && (
                            <tfoot className='bg-[#0ea5e9] border-t-2 border-[#0ea5e9] text-white text-xs font-semibold'>
                                <tr>
                                    <td className='p-2' colSpan={5}>{list.length} Customer</td>
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



                {isDetailsModal && <OrdersDetails setIsDetailsModal ={setIsDetailsModal} />}  
                {isPaymentModal && <CustomerPayment setIsPaymentModal={setIsPaymentModal} />} 

            </div>

            {isCustomerModalOpen && <CustomerAdd setIsCustomerModalOpen={setIsCustomerModalOpen} />}
            
            <BottomNav />

            {/* Place the ConfirmModal here */}
            <ConfirmModal
                open={deleteModalOpen}
                customerName={selectedCustomer?.customerName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeCustomer(selectedCustomer._id);
                    setDeleteModalOpen(false);
                }}
            />

        </section>
    );
};


// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, customerName }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-[#be3e3f]">{customerName}</span>?</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>

        </div>
    );
};


export default Customers;