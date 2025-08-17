import React from 'react'
import BottomNav from '../components/shared/BottomNav';
import Greetings from '../components/home/Greetings';
import ErpMenu from '../components/erp/ErpMenu';

const Erp = () => {
    return (
       <section className ='bg-blue-100 h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
        
        <div className ='flex-[3]  bg-linear-65 from-indigo-300 to-sky-100'> 
            <div className ='bg-white mt-0'>
                 <Greetings/>
            </div>
           

            <div className ='px-5 py-2 flex justify-between flex-wrap'>
                <ErpMenu />
            </div>
        </div> 

        <div className ='flex-[2] bg-white'>
        </div>

        <BottomNav />

       </section>
    );
};



export default Erp ;