import React from 'react'
import { getAvatarName, getBgColor } from '../../utils';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { CgUnavailable } from 'react-icons/cg';
import { BsCheck2Circle } from 'react-icons/bs';

const CarsCard =({id, category, name, color, carNo, status, image, price}) => {
    return (
        
        <div  className ='w-[300px] bg-white p-4 rounded-lg shadow-xl cursor-pointer hover:bg-gray-300'>
   
            <div className ='flex items-center justify-between px-1'>
                <h1 className ='text-blue-700 text-md font-semibold'>{name}<FaLongArrowAltRight 
                className='ml-1 mr-1 inline text-red-700'/></h1>
                <p className ={`${status === 'Rented'? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}  text-sm font-semibold px-2 py-1 rounded-lg shadow-lg`}>
                    <CgUnavailable className ='inline' size ={25} hidden ={status === 'Available'}/> 
                    <BsCheck2Circle hidden ={status === 'Rented'} size ={20} className ='inline'/>
                    {status}
                </p>
            </div>
               
               <div className ='flex items-center justify-center mt-5 mb-10' >
                   <h1 className ={`text-white rounded-full p-5 text-sm`} style ={{ backgroundColor:  getBgColor()}}>{getAvatarName(name) || ' N/A'}</h1>
               </div>
   
               { <p className ='text-[#1a1a1a] text-sm'>Class : <span className ='text-blue-700 text-sm font-semibold'>{category}</span></p>}
               
          </div>
    );
};


export default CarsCard;