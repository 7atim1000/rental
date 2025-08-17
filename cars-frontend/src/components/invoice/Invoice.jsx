import React, { useRef } from 'react'
import { motion } from 'framer-motion'
//import { faCheck } from 'react-icons/fa6'

const Invoice = ({orderInfo, setShowInvoice}) => {

    const invoiceRef = useRef(null);
    
    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML;
        const WinPrint = window.open("", "", "width=900, height=650");
        
        WinPrint.document.write(` 
            <html>
                <head>
                    <title>Order Receipt</title>
                    <style>
                        body { fonst-family: Arial, sans-serif; padding: 20px; }
                        .receip-container { width: 300px; border: 1px solid #ddd; padding: 10px;}

                        h2 {text-align: center;}
                    </style>
                </head>
                <body>
                ${printContent}
                </body>
            </html>
            `);
        WinPrint.document.close();
        WinPrint.focus();
        setTimeout(() => {
            WinPrint.print();
            WinPrint.close();
        }, 1000);
    }


    return (

        <div className ='fixed inset-0 bg-opacity-50 flex justify-center items-center h-[calc(100vh-3rem)] 
        overflow-y-scroll scrollbar-hidden '>
            <div className = 'bg-white p-4 rounded-lg shadow-lg  w-[400px] '>
                {/* Receipt content for printing */}
                <div ref ={invoiceRef} className ='p-4'>
                    
                    {/*Receipt Header*/}
                    <div className ='flex justify-center nb-4'>
                        <motion.div
                           initial ={{ scale: 0, opacity: 0 }}
                           animate ={{ scale: 1.0, opacity: 1 }}
                           transition ={{ duration: 0.5, type: "spring", stiffness: 150 }}
                           className ='mt-0 w-12 h-12 border-8 border-[#0ea5e9] rounded-full flex items-center'
                        >
                        <motion.span
                            initial ={{ scale: 0, opacity: 0 }}
                            animate ={{ scale: 1 }}
                            transition ={{ delay: 0.3, duration: 0.3 }}
                            className ='text-2xl'    
                        >

                        </motion.span>
                        </motion.div>

                    </div>

                    <h2 className ='text-xl font-bold text-center mb-2'>Rental Receipt</h2>
                    <p className ={`text-center text-gray-600`}>Thank you for your rental</p>
                    
                    {/*Order Details*/}
                    <div className ='mt-4 border-t pt-4  text-sm text-gray-700'>
                        <p>
                            <strong>Rent No: </strong>
                            {orderInfo.orderNo} 
                        </p>
                        <p>
                            <strong>Name : </strong> {orderInfo.customerDetails.name} 
                        </p>
                        <p>
                            <strong>Phone : </strong> {orderInfo.customerDetails.phone} 
                        </p>    
                        <p>
                            <strong>License : </strong> {orderInfo.customerDetails.licenseNo }
                        </p>
                        <p>
                            <strong>Email : </strong> {orderInfo.customerDetails.email}
                        </p>
                    </div>

                    {/*Items Summary*/}
                    <div className ='mt-4 border-t pt-4'>
                        <h3 className ='text-sm font-semibold'>Ordered Information</h3>
                            <ul className ='text-sm text-gray-700'>
                                {orderInfo.items.map((item, index) => (
                                    <li 
                                        key= {index}
                                        className ='flex justify-between items-center text-xs'
                                    >
                                        <span>
                                            {item.name} - {item.quantity} <span>DAYS</span>
                                        </span>
                                        <span>AED {item.price.toFixed(2)}</span>
                                    </li>
                                ))}  
                            </ul>
                    </div>
 

                    {/*Bills Summery */}
                    <div className ={`mt-4 border-t pt-4 text-sm`}>
                        <p className ='flex gap-1'>
                            <span className ='text-sm font-semibold'>Total : </span><span className ='text-xs'>AED </span><span className ='text-xs font-semibold'>{orderInfo.bills.total.toFixed(2)}</span>  
                        </p>
                        <p>
                             <span className ='text-sm font-semibold'>Tax : </span><span className ='text-xs'>AED </span><span className ='text-xs font-semibold'>{orderInfo.bills.tax.toFixed(2)}</span>
                        </p>
                        <p className ='mt-2'>
                            <strong className ='text-xs'>Grand Total: </strong> <span className ='text-xs'>AED </span><span className ='text-xs font-semibold'>{orderInfo.bills.totalWithTax.toFixed(2)}</span>
                        </p>
                        <div className =  'flex items-center justify-between'>
                            <p>
                                <span className='text-sm font-semibold'>Payed : </span><span className='text-xs'>AED </span>
                                <span className='text-xs font-semibold text-[#0ea5e9]'>{orderInfo.bills.payed.toFixed(2)}</span>
                            </p>
                            <p className='mt-2'>
                                <strong className='text-xs'>Balance : </strong> <span className='text-xs'>AED </span>
                                <span className='text-xs font-semibold text-[#be3e3f]'>{orderInfo.bills.balance.toFixed(2)}</span>
                            </p>

                        </div>
                    </div>

                    {/**payment Details */}
                    <div className ={`mb-2 mt-2 border-t pt-4 text-xs`}>
                        {orderInfo.paymentMethod === 'Cash' ? (
                            <p>
                               <strong>payment Method : </strong>{" "}
                               {orderInfo.paymentMethod}  
                            </p>
                        ): (
                            <>
                            {/*Online payment */}
                            </>
                        )}
                      
                    </div>

                    
                </div>
                
                {/** Buttons */}
                <div className ='flex justify-between mt-4'>
                    <button
                        onClick={handlePrint}
                        className ='text-[#0ea5e9] font-semibold hover underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >  
                        Print Receipt
                    </button>
                    <button
                        onClick={() => setShowInvoice(false)}
                        className ='text-[#be3e3f] font-semibold hover: underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
};


export default Invoice;