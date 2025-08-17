import React, {useRef, useEffect} from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../../redux/slices/cartSlice'


const CartInfo = () => {
    // adding Item
    const cartData = useSelector(state => state.cart);

    // scrollbar
    const scrolLRef = useRef();
        useEffect(() => {
            if(scrolLRef.current) {
                scrolLRef.current.scrollTo({
                    top :scrolLRef.current.scrollHeight,
                    behavior :'smooth'
                })
           }
        }, [cartData]);


    
    // removeItem
    const dispatch = useDispatch(); 

    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId))

    }

    return (
        <div className ='px-4 py-1'>
                    
            {/* <h1 className ='text-sm text-blue-700 font-semibold'>Service Details</h1> */}
                <div className ='mt-4 overflow-y-scroll scrollbar-hidden h-[160px]' ref ={scrolLRef}>
                  
                    {cartData.length === 0 
                    ? (<p className ='text-xs text-red-700 flex justify-center'>Your cart is empty . Start adding items !</p>) 
                    
                    : cartData.map((item) => {
                        return (

                        <div className ='bg-white rounded-lg px-2 py-2 mb-2 shadow-xl border-b-2 border-[#0ea5e9]'>
                        
                        <div className ='flex items-center justify-between'>
                            <h1 className ='text-xs font-normal'><span className ='text-xs'>Car : </span>
                            <span className ='text-xs text-[#0ea5e9]'>{item.name}</span></h1>
                            <p className ='text-[#1a1a1a]  text-sm'><span className ='text-xs'>
                                <span className ='text-[#0ea5e9] text-sm'>{item.pricePerQuantity}</span> x </span>
                            <span className ='text-sm font-semibold text-[#0ea5e9]'>{item.quantity}</span></p>
                        </div>
                         <div className ='flex items-center justify-between'>
                            <h1 className ='text-xs font-normal'><span className ='text-xs underline text-green-600'>{item.carNo}</span></h1>
                            {/* <p className ='text-[#1a1a1a] font-medium text-sm'><span className ='text-xs'>x </span><span className ='text-md font-medium text-blue-800'>{item.dateReturn}</span></p>  */}
                        </div>
                            
                        <div className ='flex items-center justify-between mt-3 '>
                            <MdDeleteForever onClick ={() => handleRemove(item.id)} className ='text-[#be3e3f] cursor-pointer' size ={20}/>
                            <p className ='text-[#1a1a1a]'><span className ='text-xs'>AED </span>
                                <span className ='text-md text-[#0ea5e9] font-semibold'>{item.price}</span>
                            </p>
                        </div>

                    </div>
                            
                        )
                    })}

                    
                </div>

        </div>
    );
};



export default CartInfo;