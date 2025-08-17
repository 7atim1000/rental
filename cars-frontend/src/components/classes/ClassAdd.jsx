import React, {useState} from 'react' 
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IoCloseCircle } from "react-icons/io5";
import { addCategory } from '../../https';

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

const ClassAdd = ({setIsClassModalOpen}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name :""
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        categoryMutation.mutate(formData)
        window.location.reload()
        setIsClassModalOpen(false)
    }

    const categoryMutation = useMutation({
        mutationFn: (reqData) => addCategory(reqData),
        
        onSuccess: (res) => {
         
            const { data } = res;
            //console.log(data)
            enqueueSnackbar(data.message, { variant: "success"});
        },

        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error"});

            console.log(error);
        },
    });
     
    const handleClose = () => {
        setIsClassModalOpen(false)
    }
    


return (

    <div className ='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50'>
            
        <motion.div
            initial ={{opacity :0 , scale :0.9}}
            animate ={{opacity :1, scale :1}}
            exit ={{opacity :0, scale :0.9}}
            transition ={{durayion :0.3 , ease: 'easeInOut'}}
            className ='bg-white p-6 rounded-lg shadow-lg/30 w-120 md:mt-5 mt-5'
        >


        {/*Modal Header */}
        <div className="flex justify-between items-center mb-4 shadow-xl p-1">
            <h2 className ='text-[#1a1a1a] text-sm font-semibold'>Add Class</h2>
            <button onClick ={handleClose} 
            className='rounded-sm border-b border-[#be3e3f] text-[#be3e3f] cursor-pointer hover:bg-[#be3e3f]/30'
            >
            <IoCloseCircle size={25}/>
            </button>
        </div>
          
        {/*Modal Body*/}
        <form className ='mt-3 space-y-6' onSubmit ={handleSubmit}>
                  
            <div>
                <label className ='text-[#1f1f1f] block mb-2 mt-3 text-sm font-medium'>Class Name :</label>
                <div className ='flex items-center rounded-lg p-2 px-4 bg-white shadow-lg/30'>
                    <input 
                        type ='text'
                        name ='name'
                        value ={formData.name}
                        onChange ={handleInputChange}
                           
                        placeholder = 'Enter class name'
                        className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none'
                        required
                        autoComplete='none'
                        />
                </div>

            </div>
    

            <button
                type ='submit'
                className ='w-full rounded-lg mt-6 py-3 text-sm font-semibold bg-blue-500 text-[#f5f5f5] cursor-pointer hover:bg-green-500 hover:text-white'
            >
                Add Class
            </button>
                           
                  
        </form>
            </motion.div>
        </div> 
    );
}



export default ClassAdd;