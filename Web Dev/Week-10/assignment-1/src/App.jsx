import "./App.css";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { useState } from "react";
import AuthContextProvider from "./context/authcontext";
import AppbarContext from "./components/AppbarContext";
import LoginContext from "./components/LoginContext";


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [info, setinfo] = useState({ name: "" });
  const [isChecked, setIsChecked] = useState(false);
  const toggle = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      {!isChecked ? (
        <>
          <Appbar
            info={info}
            isLoggedIn={isLoggedIn}
            setisLoggedIn={setisLoggedIn}
            isChecked={isChecked}
          />
          <div id="appbar-box-2">
            <input type="checkbox" name="checkbox" id="" onChange={toggle} />
            Use Context API : {isChecked ? "On" : "Off"}
          </div>
          <Login setinfo={setinfo} setisLoggedIn={setisLoggedIn} />
        </>
      ) : ( 
        <>
          <AuthContextProvider value={{info,setinfo,isLoggedIn,setisLoggedIn}}>
            <AppbarContext />
            <div id="appbar-box-2">
              <input type="checkbox" name="checkbox" id="" onChange={toggle} />
              Use Context API : {isChecked ? "On" : "Off"}
            </div>
            <LoginContext />
          </AuthContextProvider>
        </>
      )}
    </>
  );
}

export default App;
