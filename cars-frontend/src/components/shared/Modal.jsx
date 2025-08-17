import React from 'react'

const Modal = ({title, onClose, isOpen, children}) => {
    if (!isOpen) return null;
    return (
        <div className ='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'>
       
            <div className ='bg-white shadow-lg/30 w-110 rounded-lg p-4 max-w-2xl mx-4'>
            
                <div className ='flex justify-between items-center px-6 py-1 border-b border-blue-200'>
                    <h2 className ='text-lg text-[#1f1f1f] font-semibold'>{title}</h2>
                    <button className ='text-red-700 text-2xl hover:text-green-700 cursor-pointer' onClick={onClose}>
                    &times;
                    </button>
                </div>

                <div className ='p-6'>
                    {children}
                </div>

        </div>

      </div>

    );
};



export default Modal;