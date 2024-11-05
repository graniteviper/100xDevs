import React,{createContext,useState} from 'react'

export const DataContext = createContext();

const DataProvider = ({children}) => {

  const [Data,setData] = useState(null);
  
  return (<DataContext.Provider value={{Data,setData}}>
        {children}
    </DataContext.Provider>
  )
  
}

export default DataProvider

