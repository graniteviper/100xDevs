import React, { useRef } from 'react'

const Login = ({setinfo,setisLoggedIn}) => {
    const nameRef = useRef(null)
    function submit(){
        const name = nameRef.current.value;
        setinfo((prevInfo)=>({...prevInfo, name: name}))
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

export default Login