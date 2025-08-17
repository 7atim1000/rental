import React from 'react' ;

const MiniCart = ({title, icon , number}) => {
 
    return (

        <div className='bg-white py-1 px-5 rounded-lg w-[50%] shadow-lg/30 border-b-3 border-[#0ea5e9]'>
            <div className='flex items-start justify-between'>
                <h1 className='text-[#1a1a1a] text-lg tracking-wide mt-2 text-sm font-semibold'>{title}</h1>
                <button className={` ${title === 'Total Earning' ? 'bg-green-600 text-sm rounded-full text-white' 
                    : 'rounded-full bg-[#F6B100] text-sm'} p-3 text-sky-400 text-lg mt-2 shadow-lg/30`}>{icon}</button>
            </div>

            <div>
                <h1 className='text-sky-600 text-2xl font-bold mt-2'><span className='text-xs font-normal text-[#1a1a1a]'>AED </span>{number}</h1>
            </div>
        </div>

    );
};


export default MiniCart ;