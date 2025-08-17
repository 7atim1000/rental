import React, {useState} from 'react' 
//https://www.freepik.com/search?format=search&last_filter=page&last_value=4&page=4&query=cars+background#uuid=c8d39350-d13e-4c3b-aa47-35d7c846afb4
import car from '../assets/images/carImage.jpg' 
import { IoCarSportSharp } from "react-icons/io5";
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';


const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className ='flex min-h-screen w-full overflow-y-scroll scrollbar-hidden'>

            {/*left section */}
            <div className ='w-1/2 relative flex items-center justify-center bg-cover' >
           
                {/**bg Image */}
                {/* <img className ='w-full h-full object-cover' src={car} alt='Car image'/> */}
                <div className="w-[500px] h-[300px]">  {/* Adjust dimensions as needed */}
                    <img className="w-full h-full object-cover" src={car} alt="Car image" />
                </div>
                {/*Black overlay */}
                <div className ='absolute inset-0  bg-opacity-80'></div>

                {/*Quote at bottom */}
                <blockquote className= 'absolute bottom-3 px- mb-3 text-sky-600 text-lg italic '>
                Serve customers the best services with prompt and friendly service in a 
                welcoming atmosphere, and they'll keep coming back.
                <br />
                <span className ='block mt-4 text-orange-400 text-md'>- Founder of Car rent</span>

                </blockquote>

            </div>
            
            {/*right section */}
            <div className ='w-1/2 min-h-screen bg-white p-1 shadow-xl overflow-y-scroll scrollbar-hidden'>
                <div className ='flex flex-col items-center gap-2'>
                   <IoCarSportSharp className ='h-14 w-14 rounded-full p-1 text-[#0ea5e9]'/>
                   <h1 className ='text-lg font-semibold text-[#1a1a1a]'>Cars Rental</h1>
                </div>

                <h2 className ='text-lg text-center mt-1 font-semibold text-[#0ea5e9] mb-7'>{isRegister ? "Employee Registeration" : "Employee Login"}</h2>

                {/*components */}
                {/* <Register /> <Login />*/}

                {isRegister ? <Register setIsRegister={setIsRegister}/> : <Login />}
            
                
                <div className ='flex justify-center mt-2'>
                    <p className ='text-sm text-[#1a1a1a]'>{isRegister ? "Already have an account ?" : "Don't have a account ? "}</p><p className ='text-[#f5f5f5]'>-</p>
                    <a
                    onClick ={() => setIsRegister(!isRegister)} 
                    href='#'
                    className ='text-green-600 text-sm font-semibold hover:underline '
                    >{isRegister ? "Sign in" : "Sign up"}
                    </a>
                </div>
            </div>



        </div>
    );
};


export default Auth ;