import React ,{useState}from 'react'
import { HiMiniKey } from "react-icons/hi2";
// npm i @reduxjs/toolkit react-redux
import {useDispatch} from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';
import { updateService } from '../../redux/slices/customerSlice';
import { TbCancel } from "react-icons/tb";
import { GiCheckMark } from "react-icons/gi";

const ItemsCard = ({id, name, status, carNo, price, cat, image}) => {
    
    const [dayCount, setDayCount] = useState(0);
    const [itemId, setItemId] = useState();             
        
    const increment = (id) => {                         
      
        setItemId(id);                                  
        setDayCount((prev) => prev + 1)
    }
    const decrement = (id) => {
           
        setItemId(id);
        if (dayCount <= 0) return;
        setDayCount((prev) => prev - 1); 
    }

    // send data to store and cardScreen
    const dispatch = useDispatch();

    const handleAddToCard = (item) => {
        if (dayCount === 0) return ;

        if (dayCount < 5) {
        const { name, price } = item;

        //slice item
        const service = {serviceId: id}

        const newObj = { id: new Date(), name, carNo , pricePerQuantity:price, quantity:dayCount, qty:dayCount, price :price*dayCount };

        // send data to CartInfo

        dispatch(addItems(newObj));
        // slice item
        dispatch(updateService({service}))

        setDayCount(0);
        }
        

    }

    
    
    /////////////////////////
    return (
       
        <div className='flex flex-col justify-start gap-2 p-2 rounded-lg h-[250px] w-[175px] cursor-pointer bg-white shadow-lg/30 mt-0 ' >

            <div className='flex justify-between items-center mb-0'>

                <div className='flex flex-col gap-0 mb-0'>
                    <h1 className='text-sm font-semibold text-sky-500 flex justify-start items-start'>{name}</h1>
                    <p className='text-xs'>{carNo}</p>
                    <p className='text-xs text-green-700 mt-2'>{cat}</p>
                </div>

                <div className='mt-0'>
                    <button disabled={status === "Booked"} onClick={() => handleAddToCard({ id, name, status, price, cat, carNo })}
                        className='cursor-pointer mt-0'>
                        <HiMiniKey className='text-[#0ea5e9] bg-white flex justify-end items-end shadow-lg/30' size={35} />
                    </button>
                </div>

            </div>

            <div className='flex gap-3 items-center  justify-between bg-sky-50 px-4 py-3 rounded-sm mr-0 shadow-xl'>
                <button
                    onClick={() => decrement(id)}
                    className='text-[#0ea5e9] text-lg hover:bg-[#be3e3f]/30 rounded-full w-6 p-1 cursor-pointer cursor-pointer'
                >
                    &minus;
                </button>
                <span className={`${dayCount > 9 ? "text-lg" : "text-3xl"} text-green-700 flex flex-wrap gap-2  font-semibold`}>
                    {id === itemId ? dayCount : "0"}<span className={`${dayCount > 9 ? "mt-2  text-xs" : "mt-3 text-xs"} text-[#1f1f1f]`}>days</span></span>

                <button
                    onClick={() => increment(id)}
                    className='text-green-600 text-lg hover:bg-green-600/30 rounded-full w-6  p-1 cursor-pointer'
                >
                    &#43;
                </button>

            </div>

            <div className='flex items-center justify-between'>
                <p className='ml-0  text-[#0ea5e9] text-lg font-semibold text-lg'>
                    <span className='text-xs font-normal text-[#1a1a1a]'>AED </span>{price.toFixed(2)}
                </p>
                <img className='rounded-full border-b-3 border-[#0ea5e9] w-15 h-15 hover:w-25 hover:h-25' src={image} />

            </div>


            <div className='w-full flex justify-between items-center  shadow-lg px-1'>
                {/* <p className ='text-xs text-white'>discount</p> */}
                <p className={`${status === 'Booked' ? "text-[#0ea5e9]" : "text-green-700"} bg-white w-[80%] text-xs font-semibold py-2`}>{status}</p>
                <TbCancel hidden= {status === "Available"} className ='text-[#be3e3f] w-6 h-6 bg-[#be3e3f]/30'/>
                <GiCheckMark hidden= {status === "Booked"} className ='text-green-600 w-6 h-6 bg-green-600/30' />
            </div>


        </div>
    )
}



export default ItemsCard ;