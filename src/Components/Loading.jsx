import React from 'react'

function Loading() {
  return (
    <div className='z-[100] fixed top-0 left-0 h-full w-full backdrop-blur-[2px] flex justify-center items-center'>
        <div className="shadow-xl text-3xl font-semibold px-6 py-4 rounded-md">Loading...</div>
     </div>
  )
}

export default Loading