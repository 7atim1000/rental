import React , {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import imgUpload from '../../assets/images/upload-img.jpg'
import { IoCloseCircle } from 'react-icons/io5';
import { toast } from 'react-toastify'
import { api } from '../../https';

const AddCar = ({setIsAddCarModal}) => {
    const handleClose = () => {
        setIsAddCarModal(false)
    }

    const [carImg, setCarImg] = useState(false)

    const [name, setName] = useState('')
    const [carNo, setCarNo] = useState('')
    const [price, setPrice] = useState('')
    const [color, setColor] = useState('')
    const [category, setCategory] = useState('')


    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!carImg) {
                return toast.error('Please specified car image')
            }

            const formData = new FormData()

            formData.append('image', carImg)
            formData.append('category', category)
            formData.append('name', name)
            formData.append('carNo', carNo)
            formData.append('color', color)
            formData.append('price', price)
            formData.append('status', 'Available')

            //console log formData
            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);
            });

            const { data } = await api.post('/api/item', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (data.success) {
                //toast.success(data.message)
                
                window.location.reload();
                setIsAddCarModal(false);

                setCarImg(false)
                setCategory('')
                setName('')
                setColor('')
                setCarNo('')
                setPrice('')

            } else {
                toast.error(data.message)
            }

        } catch (error) {

        }
    };


    // Categories fetch
    const [list, setList] = useState([])
    const fetchClasses = async () => {
        try {

            const response = await api.get('/api/category/') // get Method not post Method
            if (response.data.success) {
                setList(response.data.categories);
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    };
   
    useEffect(() => {
        fetchClasses()
    }, []);



    return (

        <div className='fixed inset-0 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-white p-3 rounded-lg shadow-lg/30 w-120 md:mt-1 mt-5 h-[calc(100vh)]'
            >

                {/*Modal Header */}
                <div className="flex justify-between items-center mb-4 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-sm font-bold'>New Car</h2>

                    <button onClick={handleClose} 
                    className='rounded-sm border-b border-[#be3e3f] text-[#be3e3f] cursor-pointer hover:bg-[#be3e3f]/30'
                    >
                        <IoCloseCircle size={25} />
                    </button>
                </div>

               
                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit ={onSubmitHandler} >
                        
                        <div className ='flex items-center gap-4 mb-2'>
                            <label htmlFor='car-img'>
                                <img className='w-16 bg-white w-15 cursor-pointer rounded-full w-15 h-15 p-1 border border-[#0ea5e9] shadow-xl' 
                                src ={carImg ? URL.createObjectURL(carImg): imgUpload}
                                />
                            </label>
                            <input  onChange={(e)=> setCarImg(e.target.files[0])} type ='file' id ='car-img' hidden />
                            <p className='text-xs font-semibold text-sky-600'>Car image</p>
                        </div>


                    <div className='mt-2 flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Classes :</label>
                        <div className='flex w-[80%] items-center p-2 px-4 bg-white shadow-xl'>
                            <select className='w-full bg-sky-100 text-[#1a1a1a] h-8 rounded-lg' 
                               
                                onChange ={(e) => setCategory(e.target.value)}
                                value ={category}
                                required
                                >
                               
                                <option className ='text-sky-600 text-xs font-normal'>Select Class ...</option>
                               
                                {list.map((category, index) => (
                                    <option key={index} value={category.name} className='text-xs font-normal'>
                                        {category.name}
                                </option>

                                ))};
                            </select>
                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Car name :</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <input
                                type='text'
                                // name='serviceName'
                                onChange ={(e)=> setName(e.target.value)} 
                                value ={name}
                
                                placeholder='Enter car name'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Car number :</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <input
                                type='text'
                                // name='serviceName'
                                onChange ={(e)=> setCarNo(e.target.value)} 
                                value ={carNo}
                
                                placeholder='Enter car number'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Color :</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <input
                                type='text'
                                // name='serviceName'
                                onChange={(e) => setColor(e.target.value)}
                                value={color}

                                placeholder='Enter car color'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Price</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <input
                                type='text'
                            
                                onChange ={(e)=> setPrice(e.target.value)} 
                                value ={price}

                                placeholder='Enter price of rental'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <button
                        type='submit'
                        className='w-full p-2 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer'
                    >
                        Add Car
                    </button>

                </form>

            </motion.div>
        </div>  

    );
};


export default AddCar;