import React, {useState, useEffect} from 'react' 
import { BsEmojiHeartEyesFill } from "react-icons/bs";

import { useSelector } from 'react-redux';
import AnalogClock from './AnalogClock';

const Greetings = () => {

    const [dateTime, setDateTime] = useState(new Date());
    
    const userData = useSelector(state => state.user)

        useEffect(() => {
            const timer = setInterval(() => setDateTime(new Date()), 1000);
            return ()=> clearInterval(timer);
        }, []); 
    
        const formatDate = (date) => {
            const months = [
                'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, 
            ${date.getFullYear()}` ;
        };
    
        const formatTime = (date) =>
            `${String(date.getHours()).padStart(2, '0')}:${String(
                date.getMinutes()
            ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}` ;
    
    
    
    return (
       
        <div className ='flex justify-between items-center mt-0 px-8 border-bottom shadow-xl p-1'>
            <div className ='flex flex-col gap-1'>
                <h1 className ='text-[#1a1a1a] text-xs text-sky-600 flex items-center gap-2'>Welcome : 
                    <p className ='text-md font-semibold text-[#1a1a1a]'>{userData.name || 'Username'}</p></h1>
                <p className ='text-xs flex items-center justify-between gap-1'>Give your best services for customers <BsEmojiHeartEyesFill  className ='inline text-sky-500 text-lg font-semibold mt-0'/></p>
            </div>
            <div className ='flex flex-col gap-1 items-center'>
                 <AnalogClock className="w-10 h-10 flex items-center" />
                <p className='text-[#1a1a1a] text-xs font-normal'>{formatDate(dateTime)}</p>
            </div>

        </div>
    
    );
};



export default Greetings ;