import React,{useContext} from 'react'
import axios from 'axios';
import { DataContext } from '../context/DataContext';

const Button = () => {

    const {Data,setData} = useContext(DataContext);

    async function getUsers(){
        let response = await axios.get('https://randomuser.me/api?page=1')
        // console.log(response);
        setData(response);
    }
  return (
    <div className='flex justify-center items-center text-white'>
        <button className=' bg-black p-3 rounded-md' onClick={getUsers}>
            Get Users
        </button>
    </div>
  )
}

export default Button
