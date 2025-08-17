import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti";
import { MdKeyboardBackspace } from "react-icons/md";

const BackButton = () => {

    const navigate = useNavigate();
    return (
        <button onClick ={() => navigate(-1)} className ='p-1 text-md font-semibold rounded-full cursor-pointer shadow-xl mr-2'>
            <MdKeyboardBackspace className ='text-[#0ea5e9] ' size={25}/>

        </button>
    );
};


export default BackButton ;