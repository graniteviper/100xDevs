import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const AppbarContext = () => {
    
  const {info,setinfo,isLoggedIn,setisLoggedIn} = useContext(AuthContext)

  
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
  
export default AppbarContext;
