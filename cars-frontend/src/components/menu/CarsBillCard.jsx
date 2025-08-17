import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { getAvatarName, getBgColor } from '../../utils';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { CgUnavailable } from 'react-icons/cg';
import { BsCheck2Circle } from 'react-icons/bs';
import { setCar } from '../../redux/slices/carSlice';

const CarsBillCard =({id, category, name, color, carNo, status, image, price, bookedBy, dateReturn}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInvoice = (_id, name, price, color, category, carNo, image) => {
        dispatch(setCar({ _id, name, price, color, category, carNo, image }));
        navigate('/menu');
        //console.log(customerId)
    };
    return (
        
        <div  className ='w-[250px] h-[310px] bg-white p-1 rounded-lg shadow-lg/30 cursor-pointer hover:bg-[#0ea5e9]/10'>
   
            <div className ='flex items-center justify-between p-1 shadow-lg/xl'>
                <h1 className ='text-[#0ea5e9] text-sm font-semibold'>{name}</h1>

                <p className ={`${status === 'Rented'? "bg-red-200 text-[#be3e3f]" : "bg-green-200 text-green-700"} 
                    text-xs font-semibold px-2 py-1 rounded-lg shadow-lg`}>
                    <CgUnavailable className ='inline' size ={25} hidden ={status === 'Available'}/> 
                    <BsCheck2Circle hidden ={status === 'Rented'} size ={20} className ='inline'/>
                    {status}
                </p>
            </div>
               
            <div className ='flex items-center justify-center mt-2 mb-2' >
                <img src ={image} className ='h-35 hover:h-60 rounded-sm'/>
            </div>
   
            <div className ='flex flex-col gap-1'>
                <div className ='flex justify-between items-center'>
                    <p className='text-[#1a1a1a] text-xs'><span className='text-[#0ea5e9] text-xs font-semibold'>{category}</span></p>
                    <p className='text-[#1a1a1a] text-xs'>CarNo : <span className='text-[#0ea5e9] text-sm font-semibold'>{carNo}</span></p>
                </div>
                <div className ='flex justify-between items-center'>
                    <p className='text-[#1a1a1a] text-xs'>Color : <span className='text-[#0ea5e9] text-sm font-semibold'>{color}</span></p>
                    <p className='text-[#1a1a1a] text-xs'>Price : <span className='text-[#0ea5e9] text-sm font-semibold'>{price}</span>
                        <span className ='text-[#1a1a1a] text-xs font-normal'> AED</span>
                    </p>                    
                </div>
                <button
                    hidden={status === "Rented"}
                    onClick={() => handleInvoice(id, name, price, color, category, carNo, image)}
                    className='rounded-sm bg-[#0ea5e9] w-full text-[#f6b100] text-xl font-bold py-1 cursor-pointer '>
                    Rent
                </button>

                <div hidden ={status === 'Available'} className ='flex flex-col rounded-sm bg-red-200 p-1'>
                    <p
                        className='w-full text-[#1f1f1f] text-xs font-normal cursor-pointer'>
                        Rented By : <span className='text-[#0ea5e9] text-xs font-semibold'> {bookedBy}</span>
                    </p>
                    <div className ='flex items-center justify-between '>
                        <p
                            className='w-full text-[#1f1f1f] text-xs font-normal cursor-pointer w-[50%]'>
                            Return : <span className='text-[#0ea5e9] text-xs font-normal'> {new Date(dateReturn).toLocaleDateString('en-GB')}</span>
                        </p>
                        <p className={`text-xs font-normal w-[50%] ${(() => {
                                const returnDate = new Date(dateReturn);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                returnDate.setHours(0, 0, 0, 0);
                                const daysDiff = Math.floor((returnDate - today) / (1000 * 60 * 60 * 24));

                                // Apply red text if 1 day left or due today
                                return daysDiff <= 1 ? 'text-[#be3e3f]' : '';
                            })()
                            }`}>
                            {(() => {
                                const returnDate = new Date(dateReturn);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                returnDate.setHours(0, 0, 0, 0);
                                const daysDiff = Math.floor((returnDate - today) / (1000 * 60 * 60 * 24));

                                if (daysDiff > 1) return `${daysDiff} days left`;
                                if (daysDiff === 1) return '1 day left';
                                if (daysDiff === 0) return 'Due today';
                                return `${Math.abs(daysDiff)} days overdue`;
                            })()}
                        </p>
                    </div>
                   
                </div>
               
            </div>   
            
        </div>
    );
};


export default CarsBillCard;