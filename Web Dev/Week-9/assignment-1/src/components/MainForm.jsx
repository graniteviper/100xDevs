import React from 'react'
import { useRef } from 'react';

const MainForm = ({setshowTable,setdata,data}) => {

  const petNameRef = useRef(null);
  const breedRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const numberRef = useRef(null);

  function submit() {
    const petNameValue = petNameRef.current.value;
    const breedRefValue = breedRef.current.value;
    const nameRefValue = nameRef.current.value;
    const emailRefValue = emailRef.current.value;
    const numberRefValue = numberRef.current.value;

    const newData = {
      petName: petNameValue,
      breed: breedRefValue,
      name: nameRefValue,
      email: emailRefValue,
      number: numberRefValue,
    };
    setdata([...data, newData]);
    
  }

  function toggle(){
    setshowTable(true)
  }

  return (
    <div>
        <div className="form-box">
            <div className="main-form">
                <input ref={petNameRef} type="text" placeholder="Pet Name" />
                <input ref={breedRef} type="text" placeholder="Pet Breed" />
                <input ref={nameRef} type="text" placeholder="Your Name" />
                <input ref={emailRef} type="text" placeholder="Email Address" />
                <input ref={numberRef} type="text" placeholder="Contact Number" />
                <button onClick={submit}>Submit</button>
            </div>

            <div>
                <button onClick={toggle}>
                    Show Data
                </button>
            </div>
        </div>
    </div>
  )
}

export default MainForm