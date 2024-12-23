import React from 'react'

const signin = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-5 bg-purple-200 h-1/2 w-1/2 rounded-xl text-black'>
            <h1 className='text-2xl p-3'>Sign in!!</h1>
            <div><input type="text" placeholder='username' className='rounded-lg m-4 text-sm p-2 text-center'/></div>
            <div><input type="text" placeholder='password' className='rounded-lg m-4 text-sm p-2 text-center'/></div>
            <div className='px-5 py-1 bg-red-600 rounded-md mb-2'><button>Sign in</button></div>
        </div>
    </div>
  )
}

export default signin