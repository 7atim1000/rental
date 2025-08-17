import React, { useState } from 'react' 
import { useSelector } from 'react-redux'
import { formatDate, getAvatarName } from '../../utils';

const CustomerInfo = () => {
    const customerData = useSelector(state => state.customer);
    const [dateTime, setDateTime] = useState(new Date());

    return (
        <div className ='flex -items-center justify-between px-2 shadow-xl py-1'>
            {/*customer Info */}
            <div className ='flex flex-col items-start'>
                <h1 className ='text-xs font-normal text-[#0ea5e9]'>{customerData.customerName || 'Customer Name'}</h1>
                <p className ='text-[#1a1a1a] text-xs font-normal m-1'>#{customerData.orderId || '#NA'}</p>
                <p className ='text-[#1a1a1a] text-xs font-normal '>{formatDate(dateTime)}</p>
            </div>
                <button className ='bg-white border-b-2 border-[#0ea5e9] shadow-lg rounded-full shadow-lg h-10 w-10'>{getAvatarName(customerData.customerName || 'AB')}</button>   
        </div>
    );
};
    

export default CustomerInfo;