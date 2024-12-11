import React from 'react'

const page = () => {
  return (
    <>
        <div className='h-[100vh] font-mono w-[100vw] flex items-center justify-center'>
            <div className='border-2 flex flex-col items-center justify-evenly gap-5 border-red-600 border-solid rounded-xl h-[60%] w-[25%]'>
                <h1 className='text-2xl'>Let's get you Signed Up!!</h1>
                <input type="text" placeholder='email' className='w-[70%] h-[10%] rounded-lg text-black text-center'/>
                <input type="text" placeholder='password' className='w-[70%] h-[10%] rounded-lg text-black text-center'/>
                <button className='bg-slate-100 text-black px-4 py-2 rounded-sm hover:bg-red-600'>Sign Up</button>
            </div>
        </div>
    </>
  )
}

export default page