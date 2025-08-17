import React, {useState, useEffect, useRef} from 'react' 
import { api } from '../https';
import { toast } from 'react-toastify'
import { MdDeleteForever, MdFormatListBulletedAdd } from 'react-icons/md';
import { BiSolidEditAlt } from 'react-icons/bi';
import BackButton from '../components/shared/BackButton';
import AddTransaction from '../components/transactions/AddTransaction';
import {Progress} from 'antd'   

const Transactions = () => {
    const Button = [
        { label: 'New Transaction', icon: <MdFormatListBulletedAdd className='text-[#0ea5e9]' size={20} />, action: 'transaction' }
    ];

    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

    const handleOpenModal = (action) => {
        if (action === 'transaction') setIsAddTransactionModalOpen(true);
    };

    // fetch
    const [list, setList] = useState([]);
    const [search, setSearch] = useState(''); 
    const [sort, setSort] = useState('-createdAt');
    const [frequency, setFrequency] = useState(366);
    const [type, setType] = useState('all');
    const [shift, setShift] = useState('all');

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1
    });

    const [isEditTransactionModal, setIsEditTransactionModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);


    const fetchTransactions = async (search = '') => {
        try {

            const response = await api.post('/api/transactions/get-transactions',
                // { sort }, { params: {search} }
                {
                    frequency,
                    type,
                    shift,
                    search,
                    sort,
                    page: pagination.currentPage,
                    limit: pagination.itemsPerPage
                }
            );

            if (response.data.success) {
                //setList(response.data.employees)
                setList(response.data.data || response.data.transactions || []);
                console.log(response.data.data)
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
                toast.error(response.data.message || 'Transactions is not found')
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
            fetchTransactions();
        }
    }, [frequency, shift, type, search, sort, pagination.currentPage, pagination.itemsPerPage]);


    // Removing
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);    // for remove
    const [selectedTransaction, setSelectedTransaction] = useState(null);   // for remove

    const removeTransaction = async (id) => {

        try {
            const response = await api.post('/api/transactions/remove', { id },)
            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchTransactions();

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
            fetchTransactions(search);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [search, sort]);

    

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


    // Percentage and count
    const totalTransaction = list.length;

    const totalIncomeTransactions = list.filter(
        (transaction) => transaction.type === "Income"
    );
    const totalExpenseTransactions = list.filter(
        (transaction) => transaction.type === "Expense"
    );
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

    // Total amount 
    const totalTurnover = list.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = list.filter(transaction => transaction.type === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = list.filter(transaction => transaction.type === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

    return(
        <section className ='h-[100vh] overflow-y-scroll scrollbar-hidden flex gap-3 bg-[#f5f5f5]'>
            <div className ='flex-[3] bg-white h-[100vh] overflow-y-scroll scrollbar-hidden '>
                
                <div className='flex items-center justify-between px-8 py-3 bg-white shadow-xl mb-2'>
                    <div className='flex items-center'>
                        <BackButton />
                        <h1 className='text-lg font-semibold ml-2 text-[#1a1a1a]'>Transactions Management</h1>
                    </div>

                    <div className='flex gap-2 items-center justify-around gap-3 hover:bg-[#0ea5e9] shadow-lg/30'>
                        {Button.map(({ label, icon, action }) => {
                            return (
                                <button 
                                    className='bg-white px-4 py-2 text-[#1a1a1a] cursor-pointer
                                    font-semibold text-xs flex items-center gap-2 rounded-full'
                                    
                                    onClick={() => handleOpenModal(action)}
                                >
                                    {label} {icon}
                                </button>
                            )
                        })}

                    </div>

                    {isAddTransactionModalOpen && <AddTransaction setIsAddTransactionModalOpen={setIsAddTransactionModalOpen} />} 

                </div>
                {/* Search and sorting */}
                <div className="flex gap-2 items-center px-15 py-2 shadow-xl bg-white text-[#1a1a1a]">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-[#f5f5f5] text-[#1a1a1a] border border-[#0ea5e9] p-1 rounded-lg w-full text-xs font-semibold"
                        // max-w-md
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Optional: Sort dropdown */}
                    <select
                        className="border bg-[#f5f5f5] border-[#0ea5e9] p-1 rounded-lg text-[#1a1a1a] text-sm font-semibold cursor-pointer"
                        value={sort}

                        onChange={(e) => {
                            setSort(e.target.value);
                            setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when changing sort
                        }}
                    >
                        <option value="-createdAt">Newest First</option>
                        <option value="createdAt">Oldest First</option>
                        <option value="type">By type (A-Z)</option>
                        <option value="-type">By type (Z-A)</option>
                    </select>

                </div>

                <div className='mt-5 h-full' >
                    <div className='overflow-x-auto mx-5'>
                        <table className='w-[100%] text-left' >
                            <thead className='bg-white border-b-2 border-[#0ea5e9] text-[#0ea5e9] text-xs font-normal'>
                                <tr> {/**bg-[#D2B48C] */}
                                    <th className='p-1'></th>
                                    <th className='p-1'></th>
                                    <th className='p-1'></th>
                                    
                                    <th className='p-1'>Amount</th>
                                    <th className='p-1'>Category</th>
                                    <th className='p-1'>Refrence</th>
                                    <th className='p-1'>By</th>
                                
                                    <th className='p-1' style={{ marginRight: '0px' }}></th>
                                </tr>
                            </thead>

                            <tbody>

                                {list.length === 0
                                    ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your transaction list is empty .</p>)
                                    : list.map((transaction, index) => (

                                        <tr
                                             key ={index}
                                            className='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a] 
                                            hover:bg-sky-50 cursor-pointer'
                                        >
                                            <td className='p-1' hidden>{transaction._id}</td>
                                            <td className='p-1'>{transaction.date ? new Date(transaction.date).toLocaleDateString('en-GB') : ''}</td>
                                            <td className= {`${transaction.type === 'Expense' ? "bg-[#be3e3f]/50 text-[#f5f5f5]" 
                                                : "bg-green-600/80 text-[#f5f5f5]"}`}>
                                                {transaction.type}
                                            </td>
                                           
                                           <td className={`${transaction.shift === 'Morning' ? 'text-[#e6b100]' : 
                                                'text-[#0ea5e9]'
                                            } p-1`}>{transaction.shift}<span className ='text-white'> shift</span></td>

                                            <td className='p-1'>{transaction.amount.toFixed(2)}</td>
                                            <td className='p-1'>{transaction.category}</td>
                                            <td className='p-1'>{transaction.refrence}</td>
                                            <td className='p-1'>{transaction.user.name} / 
                                                <span className ='text-[#0ea5e9]'>  {transaction.user.role}</span>
                                            </td>
                                        

                                            <td className='p-1  flex flex-wrap gap-2  justify-center' 
                                                style={{ marginRight: '0px' }}>
                                                <button className={`cursor-pointer text-sm font-semibold `}>
                                                    <BiSolidEditAlt
                                                        // onClick={() => handleEdit(employee)}
                                                        className='w-6 h-6 text-[#0ea5e9] 
                                                        hover:bg-[#0ea5e9]/30 hover:rounded-full    
                                                        ' />
                                                </button>

                                                <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold`}>
                                                    <MdDeleteForever
                                                        onClick={() => { setSelectedTransaction(transaction); setDeleteModalOpen(true); }}
                                                        className='w-5 h-5 text-[#be3e3f] border-b border-[#be3e3f]
                                                        hover:bg-[#be3e3f]/30 hover:rounded-full
                                                        ' />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                            </tbody>

                            {/* Footer Section */}
                            {list.length > 0 && (

                                <tfoot className='bg-[#0ea5e9] border-t-2 border-[#0ea5e9] text-white text-xs font-semibold'>
                                    <tr>
                                        <td className='p-2' colSpan={4}>{list.length} Process</td>
                                        <td className='p-2 text-left'></td>
                                        <td className='p-2'></td>
                                        <td className='p-2'></td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tfoot>
                            )}

                        </table>

                        {/* Pagination  */}
                        {list.length > 0 && <PaginationControls />}

                    </div>

                
                    {/* Edit Employee Modal */}
                    {/* {isEditEmployeeModal && currentEmployee && (
                        <EmployeeEditModal
                            employee={currentEmployee}
                            setIsEditEmployeeModal={setIsEditEmployeeModal}
                            fetchEmployees={fetchEmployees}
                        />
                    )} */}


                </div>
 
            </div>
            <div className ='flex-[1] bg-white px-2 py-3'>
                <div className="flex gap-2 items-center px-15 py-2 shadow-xl bg-[#f5f5f5] text-white">
                    <select id='frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)}
                        className='border border-[#0ea5e9] rounded-md px-2 py-1 text-xs text-[#1f1f1f] bg-[#f5f5f5]'>
                        <option value='1'>1 Day</option>
                        <option value='7'> 7 Days</option>
                        <option value='30'> 30 Days</option>
                        <option value='90'> 90 Days</option>

                    </select>
                    <select id='type' value={type} onChange={(e) => setType(e.target.value)}
                        className='border border-[#0ea5e9] rounded-md px-2 py-1 text-xs text-[#1f1f1f] bg-[#f5f5f5]'>
                        <option value='all'>All</option>
                        <option value='Income'>Income</option>
                        <option value='Expense'>Expense</option>

                    </select>
                    <select id='shift' value={shift} onChange={(e) => setShift(e.target.value)}
                        className='border border-[#0ea5e9] rounded-md px-2 py-1 text-xs text-[#1f1f1f] bg-[#f5f5f5]'>
                        <option value='all'>All</option>
                        <option value='Morning'>Morning</option>
                        <option value='Evening'>Evening</option>

                    </select>
                </div>

                <div className='flex flex-col items-start mt-2 bg-[#f5f5f5]'>
                    
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Count of transactions :-</p>
                    <div className='flex items-center justify-between w-full px-5'>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Incomes : </span>
                            <p className='font-semibold text-md text-green-600 p-1'>
                                {totalIncomeTransactions.length} 
                                <span className ='text-[#1a1a1a] text-xs font-normal'> Process</span>
                            </p>
                        </div>
                        {/* {totalExpenseTransactions.length} */}
                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Expenses : </span>
                            <p className='font-semibold text-md text-[#be3e3f] p-1'>
                                {totalExpenseTransactions.length}
                                <span className='text-[#1a1a1a] text-xs font-normal'> Process</span>
                            </p>
                        </div>

                    </div>
                </div>

                <div className='flex flex-col items-start mt-2 bg-[#f5f5f5]'>

                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Amounts Totals :-</p>
                    <div className='flex flex-col gap-5 justify-between w-full px-5'>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>All : </span>
                            <p className='font-semibold text-md text-[#0ea5e9] p-1'>
                                {totalTurnover.toFixed(2)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> AED</span>
                            </p>
                        </div>
                      
                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Incomes : </span>
                            <p className='font-semibold text-md text-green-600 p-1'>
                                {totalIncomeTurnover.toFixed(2)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> AED</span>
                            </p>
                        </div>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Expenses : </span>
                            <p className='font-semibold text-md text-[#be3e3f] p-1'>
                                {totalExpenseTurnover.toFixed(2)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> AED</span>
                            </p>
                        </div>

                    </div>
                </div>

                <div className='flex flex-col items-start mt-2 bg-[#f5f5f5]'>

                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Percentage of transactions :-</p>
                    <div className='flex items-center justify-between w-full px-5'>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Incomes : </span>
                            <p className='font-semibold text-md text-green-600 p-1'>
                                {totalIncomeTurnoverPercent.toFixed(0)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> %</span>
                            </p>
                        </div>
                      
                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a]'>Expenses : </span>
                            <p className='font-semibold text-md text-[#be3e3f] p-1'>
                                {totalExpenseTurnoverPercent.toFixed(0)} 
                                <span className='text-[#1a1a1a] text-xs font-normal'> %</span>
                            </p>
                        </div>

                    </div>
                </div>


                <div className='flex flex-col items-start mt-15'>
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-5 mt-2'>Graphical Explanation :-</p>
                    <div className='flex items-center justify-between w-full px-15'>
                        <div className='flex items-start justify-start bg-[#f5f5f5] p-1 rounded-lg '>
                            <Progress type='circle' strokeColor={'green'} size={90} percent={totalIncomeTurnoverPercent.toFixed(0)} />
                        </div>
                        <div className='flex items-end justify-end bg-[#f5f5f5] rounded-lg  p-1'>
                            <Progress type='circle' strokeColor={'#be3e3f'} size={90} percent={totalExpenseTurnoverPercent.toFixed(0)} />
                        </div>
                    </div>

                </div>

            </div>

            <ConfirmModal

                open={deleteModalOpen}
                Type={selectedTransaction?.type}
                Amount={selectedTransaction?.amount}

                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeTransaction(selectedTransaction._id);
                    setDeleteModalOpen(false);
                }}
            />

        </section>
    );
};



// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, Type, Amount }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-[#0ea5e9]">{Type}</span>
                , Amount <span className ='text-md font-semibold text-[#be3e3f]'>{Amount.toFixed(2)} </span>
                 <span className ='text-xs font-normal'>AED</span>?</p>
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


export default Transactions