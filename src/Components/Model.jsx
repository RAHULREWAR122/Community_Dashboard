import React from 'react'
import { NavLink } from 'react-router-dom'

function Model({msg , setShowModel}) {
    
  return (
    <div className='z-[100] fixed top-0 left-0 h-full w-full backdrop-blur-[2px] flex justify-center items-center'>
        <div className="relative shadow-xl flex justify-center items-center flex-col w-full max-w-md font-semibold px-6 rounded-md py-6 ">
         <button onClick={()=>setShowModel(false)} className='text-xl text-white font-semibold bg-red-500 px-2 py-2 top-0 absolute right-0'>X</button>
         <h2 className='text-lg mt-5 '>{msg}</h2>

         <NavLink to={'/login'} onClick={()=>setShowModel(false)}  className='w-[60%] text-center mt-[20px] bg-sky-500 px-2 py-2 text-white text-lg rounded'>Login</NavLink>
        </div>
     </div>
  )
}

export default Model