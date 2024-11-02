import React from "react";

const Appbar = ({info,isLoggedIn,setisLoggedIn}) => {
    // console.log(isLoggedIn);

    
    
  return (
    <div id="appbar">
      <div id="appbar-box-1">
        <h1>Auth System Demo</h1>
        <div id="variable-box">
          <h2>Welcome, {isLoggedIn ? `${info.name}` : ""}</h2>
          <button onClick={()=>{setisLoggedIn(false)}}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;

