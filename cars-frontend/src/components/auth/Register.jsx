import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import { register } from '../../https';
import { enqueueSnackbar } from 'notistack'   // for message 

const Register = ({setIsRegister}) => {
    const[formData , setFormData] = useState({
        name : "", email : "", phone : "", password : "", role : ""   
    });
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleRoleSelection = (selectedRole) => {
        setFormData({...formData, role: selectedRole});
    }
    
    const handleSubmit =(e) => {
        e.preventDefault();
        //console.log(formData);
        registerMutation.mutate(formData);
    }

     // backend connection
     const registerMutation = useMutation({
        mutationFn : (reqData) => register(reqData),
        
        onSuccess: (res) => {
            const { data } = res;
            //console.log(data)
            enqueueSnackbar(data.message, { variant: "success"});
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: "",
            });

            setTimeout(() => {
                setIsRegister(false);
            }, 1500)
     

        },
        onError: (error) => {
            //console.log(error);
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error"});
        }
    });

    
    return (
        <div className ='rounded-sm shadow-lg p-2 mt-0 '>
            <form onSubmit ={handleSubmit}>
                
                <div className ='flex items-center justify-between'>
                    <label className ='w-[15%] text-[#1f1f1f] block mb-2 text-sm font-medium'>Name :</label>
                
                    <div className ='w-[85%] flex items-center p-3  shadow-xl'>
                        <input 
                            type ='text'
                            name ='name'
                            value ={formData.name}
                            onChange ={handleChange}
                            placeholder = 'Enter employee name'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

                <div className ='flex items-center justify-between mt-5'>
                    <label className ='w-[15%] text-[#1f1f1f] block mb-2 mt-3 text-sm font-medium'>Email :</label>
                
                    <div className ='flex w-[85%] items-center  p-3 shadow-xl'>
                        <input 
                            type ='email'
                            name ='email'
                            value ={formData.email}
                            onChange ={handleChange}
                            placeholder = 'Enter employee email'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

                
                <div className ='flex items-center justify-between mt-5'>
                    <label className ='w-[15%] text-[#1f1f1f] block mb-2 mt-3 text-sm font-medium'>Phone :</label>
                
                    <div className ='flex w-[85%] items-center  p-3 shadow-xl'>
                        <input 
                            type ='number'
                            name ='phone'
                            value ={formData.phone}
                            onChange ={handleChange}
                            placeholder = 'Enter employee phone'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

                
                <div className ='flex items-center justify-between mt-5'>
                    <label className ='w-[15%] text-[#1f1f1f] block mb-2 mt-3 text-sm font-medium'>Password :</label>
                
                    <div className ='flex w-[85%] items-center  p-3 shadow-xl'>
                        <input 
                            type ='password'
                            name ='password'
                            value ={formData.password}
                            onChange ={handleChange}
                            placeholder = 'Enter password'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

              
                {/*important  */}
                <div>
                    <label className ='block text-[#1a1a1a] mb-2 mt-3 text-sm font-medium'>Choose your role</label>
                  
                    <div className ='flex items-center gap-3 mt-4'>
                         {['Admin', 'Cashier', 'Services'].map((role) => {
                            return (
                                <button key={role}
                                type ='button'
                                onClick ={() => handleRoleSelection(role)}
                                className ={`px-3 py-3 px-4 w-full cursor-pointer  rounded-lg shadow-lg/30   text-xs font-semibold  
                                ${formData.role === role ? "bg-[#0ea5e9] text-white" : "text-[#0ea5e9] bg-white"}  
                                `}
                                >
                                    {role}
                                </button>
                            )
                         })}
                    </div>
                    
                </div>

                <button type ='submit' className ='cursor-pointer w-full rounded-lg mt-5 py-3 text-lg text-white bg-[#0ea5e9] shadow-lg font-semibold'>Sign up</button>

            </form>

        </div>
    );
}



export default Register;