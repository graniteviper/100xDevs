import React,{createContext, useState} from 'react'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [info, setinfo] = useState({name:""})
    const [isLoggedIn, setisLoggedIn] = useState(false);

  return ( <AuthContext.Provider value = {{info,setinfo,isLoggedIn,setisLoggedIn}}>
    {children}
  </AuthContext.Provider>
  )
}


export default AuthContextProvider