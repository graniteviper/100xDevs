"use client";
import React from 'react'
import axios from 'axios'
import { useRef } from 'react';

const signup = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-5 bg-purple-200 h-1/2 w-1/2 rounded-xl text-black'>
            <h1 className='text-2xl p-3'>Sign Up!!</h1>
            <div><input ref={usernameRef} type="text" placeholder='username' className='rounded-lg m-4 text-sm p-2 text-center'/></div>
            <div><input ref={passRef} type="text" placeholder='password' className='rounded-lg m-4 text-sm p-2 text-center'/></div>
            <div className='px-5 py-1 bg-yellow-300 rounded-md mb-2'><button onClick={async ()=>{
                axios.post("http://localhost:3000/api/v1/signup",{
                    username: usernameRef.current!.value,
                    password: passRef.current!.value
                })
            }}>Sign up</button></div>
        </div>
    </div>
  )
}

export default signup