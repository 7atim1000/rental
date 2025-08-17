import React , {useEffect, useState, useRef}  from 'react'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify'
import { api } from '../../https';


const OrdersDetails = ({setIsDetailsModal}) => {
    const customerData = useSelector((state) => state.customer);

    const customer = customerData.customerId ;
    const [customerInvoices, setCustomerInvoices] = useState([]);
    // fetch Details
    const fetchCustomerDetails = async() => {
            
        try {
            
            const res = await api.post('/api/order/orderCustomer' , 
            {
                customer
            }   
            );
    
            setCustomerInvoices(res.data)
            console.log(res.data)
         
                   
            } catch (error) {
            console.log(error)
            // message.error('Fetch Issue with transaction')
            }
        };

        
    useEffect(()=>{
        fetchCustomerDetails()
    },[customer]);

    // Printing
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
    };

    

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}  >

            <div className='bg-white border-b-3 border-[#0ea5e9] rounded-sm  p-2 shadow-xl w-[750px] md:mt-1 mt-1 h-[calc(100vh-2rem)] overflow-y-scroll scrollbar-hidden'>
                {/* Receipt content for printing */}
                <div ref={invoiceRef} className='p-4'>

                    {/*Receipt Header*/}
                    <div className='flex justify-center nb-4'>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.0, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                            className='mt-0 w-12 h-12 border-8 border-[#0ea5e9] rounded-full flex items-center'
                        >
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className='text-xl'
                            >

                            </motion.span>
                        </motion.div>

                    </div>

                    <h2 className='text-xl font-bold text-center mb-2'>Customers Statement</h2>
                   
                    <div className ='flex items-center justify-between shadow-xl p-2'>
                        <p className={`text-center text-xs font-medium text-[#1a1a1a]`}>Customer :
                            <span className='text-sm text-[#0ea5e9] font-semibold'> {customerData.customerName}</span>
                        </p>
                        <p className={`text-center text-xs font-medium text-[#1a1a1a]`}>He Has Debt Of :
                            <span className={`${customerData.balance === 0 ? "text-green-600" : "text-[#be3e3f]"} text-sm font-medium`}> {customerData.balance.toFixed(2)}
                            </span>
                        </p>
                    </div>

                    <div className='mt-5' >

                        <div className='overflow-x-auto px-5'>
                            <table className='w-full text-left text-[#1a1a1a]'>
                                <thead className='bg-[#0ea5e9] text-white text-xs font-normal'>
                                    <tr>
                                        <th className='p-2'></th>
                                        <th className='p-2'>invoiceType</th>
                                        <th className='p-2'>invoiceNumber</th>
                                        <th className='p-2'>Total</th>
                                        <th className='p-2'>Tax</th>
                                        <th className='p-2'>Total with tax</th>
                                        <th className='p-2'>Payed</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {customerInvoices.length === 0
                                        ? (<p className='w-full mx-5 my-5 text-xs text-[#be3e3f] flex items-start justify-start'>This customer statement is empty!</p>)

                                        : customerInvoices.map((customer, index) => (
                                            <tr
                                                key={index}
                                                className='border-b border-[#f5f5f5]  text-xs'
                                            >
                                                {/* <td className='p-2 text-xs font-normal'>{new Date(customer.date).toLocaleDateString('en-GB')}</td> */}
                                                <td className='p-2 font-semibold text-xs font-semibold'>{new Date(customer.orderDate).toLocaleDateString('en-GB')}</td>
                                                <td className='p-2 font-semibold bg-sky-50 text-xs font-semibold'>{customer.orderType}</td>
                                                <td className='p-2 text-xs font-normal font-semibold'>{customer.orderNumber}</td>
                                                <td className='p-2 text-xs font-normal font-semibold'>{customer.bills.total.toFixed(2)}</td>
                                                <td className='p-2 text-xs font-normal font-semibold'>{customer.bills.tax.toFixed(2)}</td>
                                                <td className='p-2 text-xs font-normal font-semibold'>{customer.bills.totalWithTax.toFixed(2)}</td>
                                                <td className='p-2 text-sky-600 text-xs font-normal font-semibold'>{customer.bills.payed.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                </tbody>

                                <tfoot>
                                    <tr className="bg-[#0ea5e9] font-bold text-xs text-white">
                                        <td className="p-2" colSpan={3}>Total</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.payed, 0).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>

                    </div>





                </div>

                {/** Buttons */}
                <div className='flex justify-between mt-4'>
                    <button
                        onClick={handlePrint}
                        className='text-[#0ea5e9] font-semibold hover underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Print Statement
                    </button>
                    <button
                        onClick={() => setIsDetailsModal(false)}
                        className='text-[#be3e3f] font-semibold hover: underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
};


export default OrdersDetails ;