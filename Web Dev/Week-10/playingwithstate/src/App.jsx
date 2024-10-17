// import { useState,createContext, useContext } from 'react'
// import './App.css'

// const bulbcontext = createContext();

// function bulbProvider({children}){
//   const [bulbOn, setBulbOn] = useState(true)
//   return <bulbcontext.Provider value={{bulbOn,setBulbOn}}>
//     {children}
//     </bulbcontext.Provider>
// }

// function App() {
//   return <div>
//     <bulbProvider>
//     <LightBulb />
//     </bulbProvider>
//   </div>
// }

// function LightBulb() {
//   return <div>
//     <BulbState/>
//     <ToggleBulbState/>
//   </div>
// }

// function BulbState() {
//   const {bulbOn} = useContext(bulbcontext);
//   return <div>
//     {bulbOn ? "Bulb on" : "Bulb off"}
//   </div>
// }

// function ToggleBulbState() {
//   const {bulbOn,setBulbOn} = useContext(bulbcontext);
//   function toggle() {
//     // setBulbOn(currentState => !currentState)
//     setBulbOn(!bulbOn)
    
//   }

//   return <div>
//     <button onClick={toggle}>Toggle the bulb</button>
//   </div>
// }

// export default App


import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  return <CountContext.Provider value={{count, setCount}}>
    {children}
  </CountContext.Provider>
}

function Parent() {
  return (
    <CountContextProvider>
      <Incrase />
      <Decrease />
      <Value />
    </CountContextProvider>
  );
}

function Decrease() {
  const {count, setCount} = useContext(CountContext);
  return <button onClick={() => setCount(count - 1)}>Decrease</button>;
}

function Incrase() {
  const {count, setCount} = useContext(CountContext);
  return <button onClick={() => setCount(count + 1)}>Increase</button>;
}

function Value() {
  const {count} = useContext(CountContext);
  return <p>Count: {count}</p>;
}

// App Component
const App = () => {
  return <div>
    <Parent />
  </div>
};

export default App;
