import React , {useState, useEffect} from 'react' ;
import { motion } from 'framer-motion'
import { toast } from 'react-toastify' 
import {api} from '../../https'
import { IoCloseCircle } from 'react-icons/io5'

const EditCar = ({setIsEditCarModal, car, fetchCars}) => {
    const handleClose = () => {
        setIsEditCarModal(false) ;
    }

    const [category, setCategory] = useState(car.category);
    const [name, setName] = useState(car.name);
    const [carNo, setCarNo] =useState(car.carNo);
    const [color, setColor] = useState(car.color);
    const [price, setPrice] = useState(car.price);

    const [newImage, setNewImage] = useState(null);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            if (newImage) {
                formData.append('image', newImage);
            }
            formData.append('category', category);
            formData.append('name', name);
            formData.append('carNo' , carNo);
            formData.append('color', color);
            formData.append('price', price);

            const { data } = await api.put(`/api/item/update/${car._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (data.success) {
                toast.success(data.message);
                fetchCars();
                handleClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

   
    const [categories, setCategories] = useState([]); // declare variable to fetch = useState([]) array 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesResponse = await api.get('/api/category/');
                if (categoriesResponse.data.success) {
                    setCategories(categoriesResponse.data.categories);
                }

            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);


    
    return(
        
        <div className='fixed inset-0 flex items-center justify-center shadow-lg/10 z-50'
            style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='bg-white p-3 rounded-lg shadow-lg/30 w-120 md:mt-5 mt-5 h-[calc(100vh)]'
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-sm font-bold'>Update Car</h2>
                    <button onClick={handleClose} 
                    className='rounded-sm border-b border-[#be3e3f] text-[#be3e3f] cursor-pointer hover:bg-[#be3e3f]/30'
                    >
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/* Modal Body */}
                <form className='mt-3 space-y-6' onSubmit= {onSubmitHandler}>
                    
                    {/* Image Upload */}
                    <div className='flex items-center gap-4 mb-2'>
                        <label htmlFor='edit-car-img'>
                            <img
                                className= 'w-16 h-16 cursor-pointer rounded-full p-1 border border-[#0ea5e9] shadow-xl object-cover'
                                src= {newImage ? URL.createObjectURL(newImage) : car.image}
                                alt= "carImg"
                            />
                        </label>
                        <input
                            onChange={(e) => setNewImage(e.target.files[0])}
                            type='file'
                            id='edit-car-img'
                            hidden
                        />
                        <p className='text-xs font-semibold text-sky-600'>Change image</p>
                    </div>

                    {/* Category Dropdown */}
                    <div className='mt-2 flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Category:</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <select
                                className='bg-sky-100 w-full text-[#1a1a1a] h-8 rounded-lg'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* CarName */}
                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Car Name:</label>
                        <div className='flex w-[80%] items-center p-3 bg-white shadow-xl'>
                            <input
                                type= 'text'
                                value= {name}
                                onChange= {(e) => setName(e.target.value)}
                                className= 'bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Car number:</label>
                        <div className='flex w-[80%] items-center p-3 bg-white shadow-xl'>
                            <input
                                type='text'
                                value={carNo}
                                onChange={(e) => setCarNo(e.target.value)}
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Car color:</label>
                        <div className='flex w-[80%] items-center p-3 bg-white shadow-xl'>
                            <input
                                type='text'
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Price:</label>
                        <div className='flex w-[80%] items-center p-3 bg-white shadow-xl'>
                            <input
                                type='text'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                            />
                        </div>
                    </div>

                   


                    <button
                        type='submit'
                        className='p-2 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer w-full'
                    >
                        Update Car
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditCar ;