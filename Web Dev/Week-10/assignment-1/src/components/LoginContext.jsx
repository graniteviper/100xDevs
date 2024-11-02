import React, { useContext, useRef } from 'react'
import { AuthContext } from '../context/authcontext'

const LoginContext = () => {

    const {info,setinfo,isLoggedIn,setisLoggedIn} = useContext(AuthContext)
    const nameRef = useRef(null)
    function submit(){
        const name = nameRef.current.value;
        setinfo(()=>({...info,name}))
        setisLoggedIn(true)
    }

  return (
    <div>
        <div>
            <input ref={nameRef} type="text" placeholder='Name'/>
            <button onClick={submit}>Login</button>
        </div>
    </div>
  )
}

export default LoginContext