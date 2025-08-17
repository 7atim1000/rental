import React, {useState} from 'react'

import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bills from '../components/menu/Bills';
import BackButton from '../components/shared/BackButton';
import { HiMiniKey } from "react-icons/hi2";
import { IoMdArrowDropright } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import SelectCustomer from '../components/menu/SelectCustomer';
import { addItems } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

import car from '../assets/images/carImage.jpg' 

const Menu = () => {
  
    const [formData, setFormData] = useState({
        bookingDate: '',
        returnDate: '',
        dayCount: '0'  // Initialize with '0'
    });

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Calculate days difference when both dates are available
        if (name === 'bookingDate' && formData.returnDate) {
            calculateDaysDifference(value, formData.returnDate);
        } else if (name === 'returnDate' && formData.bookingDate) {
            calculateDaysDifference(formData.bookingDate, value);
        }
    };

    const calculateDaysDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Round down to whole days

        if (daysDiff >= 0) {
            setFormData(prev => ({
                ...prev,
                dayCount: daysDiff.toString()
            }));
            setDayCount(daysDiff); // Update dayCount for handleAddToCard
        } else {
            setFormData(prev => ({
                ...prev,
                dayCount : '0'
            }));
            setDayCount(0);
        }
    };


    const dispatch = useDispatch();

    const customerData = useSelector(state => state.customer) ;
    const carData = useSelector(state => state.car) ;
    
    const cstButton = [{ label: 'Select Customer', action: 'customer' }]

    const [isSelectCustomer, setIsSelectCustomer] = useState();
    const handleSelectCustomer = (action) => {
        if (action === 'customer') setIsSelectCustomer(true)
    };

    const [dayCount, setDayCount] = useState(0);
    const [itemId, setItemId] = useState();

    const handleAddToCard = (item) => {
        // if (dayCount === 0) return;
        if (dayCount === 0) {
            // enqueueSnackbar('please specefied rental date', {variant: "warning"});
            toast.warning('please specified rental date !')
            return;
        };
        if (!carData.name) {
            toast.warning('Please select car first !')
            return;
        };

        if (dayCount < 50) {
            const { name, price } = item;

            const id = carData._id;
            const carNo = carData.carNo;
            const pricePerQuantity = carData.price;
            const dateBooking = formData.bookingDate;  const dateReturn = formData.returnDate
            // new Date()
            const newObj = { id: id, name, carNo, pricePerQuantity , quantity: dayCount, qty: dayCount, price: pricePerQuantity * dayCount ,
                dateBooking, dateReturn, bookingDays : dayCount

             };

            // send data to CartInfo

            dispatch(addItems(newObj));
            setDayCount(0);
            
            setFormData({ bookingDate: '', returnDate: '', dayCount: '0' });
        }
    };

    // const handleAddToCard = (item) => {
    //     if (formData.qty === '0' || formData.qty === '') return;

    //     const days = parseInt(formData.qty, 10);
    //     if (days < 1 || days > 50) return;

    //     const newObj = {
    //         id: carData._id,
    //         name: carData.name,
    //         carNo: carData.carNo,
    //         pricePerQuantity: carData.price,
    //         quantity: days,
    //         qty: days,
    //         price: carData.price * days,
    //         dateBooking: formData.bookingDate, // Add booking date
    //         dateReturn: formData.returnDate,   // Add return date
    //         bookingDays: days,                 // Add calculated days
    //     };


        
    const carNo = carData.carNo; const id = carData._id; const name = carData.name ; const price = carData.price
    ; const color = carData.color; const category = carData.category;
    return (
        <section className ='flex gap-3 h-[calc(100vh)] overflow-y-scroll scroll-hidden bg-[#f5f5f5]'>
        {/*left div */}
            <div className ='flex-[2] bg-white shadow-lg rounded-lg pt-0 h-[100vh]'>

                <div className='flex items-center justify-between px-2 py-2 shadow-xl'>

                    <div className='flex gap-1 justify-between'>
                        <BackButton />
                        <h1 className='text-[#1a1a1a] text-lg font-bold tracking-wider mt-2'>Rental Invoice</h1>
                    </div>

                    <div className='flex items-center justify-content shadow-xl/30 px-1 h-12 bg-sky-50 rounded-lg border-b-2 border-[#0ea5e9]'>
                        <div className='flex items-center gap-5 cursor-pointer '>

                            <div className='px-5 py-1 mb-4 rounded-md flex justify-center cursor-pointer'>
                                {cstButton.map(({ label, action }) => {

                                    return (
                                        <button onClick={() => handleSelectCustomer(action)} className='flex gap-1 items-center cursor-pointer'>
                                            <p className='text-xs mt-3 underline text-[#1a1a1a] font-normal text-xs'>{label}</p>
                                            <IoMdArrowDropright className='inline mt-4 text-[#0ea5e9]' size={20} />
                                        </button>
                                    );
                                })}
                            </div>

                            <FaCircleUser className='h-6 w-6 text-[#0ea5e9]' />
                            <div className='flex flex-col items-start'>
                                <p className='text-xs font-normal text-[#1a1a1a]'>
                                    Customer :
                                </p>
                                <p className='text-xs font-normal text-[#0ea5e9]'>
                                    {customerData.customerName || 'Customer name'}
                                </p>

                            </div>

                            <div className='flex flex-col items-start'>
                                <p className='text-xs font-normal text-[#1a1a1a]'>
                                    Balance :
                                </p>

                                <p className={`${customerData.balance === 0.00 ? 'text-green-600' : 'text-[#be3e3f]'} text-xs font-medium`}>
                                    {(Number(customerData.balance) || 0).toFixed(2)}
                                    <span className='text-xs font-normal text-[#1a1a1a] font-normal'> AED</span>
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className ='mt-2'>
                    {/* <MenuContainer /> */}
                    <div className ='p-2 flex flex-col gap-1'>
                        <div className ='shadow-xl '>
                            <h1 className ='text-[#1a1a1a] text-xl text-bold flex justify-center underline'>{carData.name}</h1>
                        </div>
                        <div className='shadow-xl mt-1 flex justify-center'>
                            <div className='w-[70%] h-70 rounded-sm overflow-hidden border-b-3 border-[#0ea5e9] p-2'> {/* Square container with circular mask */}
                                <img
                                    className='w-full h-full object-cover'
                                    src={carData.image || car}
                                    alt='Car'
                                />
                            </div>
                        </div>
                        <div className ='shadow-xl '>
                            <h1 className ='text-[#1a1a1a] text-lg text-bold flex justify-center underline'>{carData.carNo}</h1>
                        </div>

                        <div className ='shadow-xl flex items-center justify-between p-2'>
                            <div className ='shadow-lg/30 p-1 px-5 bg-[#0ea5e9] rounded-md'>
                            <p className ='text-[#f6b100] text-md font-bold flex justify-center'>{carData.category  }</p>
                            </div>
                            <div className ='shadow-lg/30 p-1 px-5 bg-[#0ea5e9] rounded-md'>
                            <p className ='text-[#f6b100] text-md font-bold flex justify-center'>{carData.carNo  }</p>
                            </div>
                            <div className='shadow-lg/30 p-1 px-5 bg-[#0ea5e9] rounded-md flex items-center gap-2'>
                                <p className='text-[#f6b100] text-lg font-bold flex justify-center'>{carData.price}</p>
                                <span className ='text-sm text-white font-normal'>AED / Day</span>
                            </div>
                        </div>

                        <div className='flex items-center justify-between px-5 shadow-xl'>

                            <div className='flex items-center justify-between'>
                                <label className='text-[#0ea5e9] block mb-2 mt-3 text-sm font-medium'>From :</label>
                                <div className='flex items-center p-2 px-4 text-xs font-normal'>
                                    <input
                                        type='date'
                                        name='bookingDate'
                                        value={formData.bookingDate}
                                        onChange={handleDateChange}
                                        className='cursor-pointer bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9] w-full'
                                        required
                                        autoComplete='none'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <label className='text-[#0ea5e9] block mb-2 mt-3 text-sm font-medium'>To :</label>
                                <div className='flex items-center p-2 px-4 text-xs font-normal '>
                                    <input
                                        type='date'
                                        name='returnDate'
                                        value={formData.returnDate}
                                        onChange={handleDateChange}
                                        className='cursor-pointer bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9] w-full'
                                        required
                                        autoComplete='none'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center p-2 px-4  text-xs font-normal w-[50%] '>
                                    <input
                                        type='text'
                                        name='dayCount'
                                        value={formData.dayCount}
                                        readOnly
                                        className='cursor-pointer bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9] w-[50%]'
                                        required
                                        autoComplete='none'
                                    />
                                </div>
                            </div>
                        
                            
                            <div className=''>
                                <button  onClick={() => handleAddToCard({ id, name, color, price, category, carNo })}
                                    className='cursor-pointer mt-0'>
                                    <HiMiniKey className='text-[#f6b100] border-b-3 border-[#0ea5e9] rounded-full p-1 bg-white flex justify-end items-end shadow-lg/30' size={60} />
                                </button>
                            </div>
                            {/* disabled={status === "Booked"} */}


                        </div>
                        
                    </div>
                </div>

            </div>

            
        {/*right div*/}
            <div className ='flex-[1] bg-white rounded-lg shadow-lg pt-2'>
                <CustomerInfo />
               
                <CartInfo />
    
                <Bills />
            </div>

            {isSelectCustomer && <SelectCustomer setIsSelectCustomer ={setIsSelectCustomer}/>}
       
        </section>
      
    );
};


export default Menu;