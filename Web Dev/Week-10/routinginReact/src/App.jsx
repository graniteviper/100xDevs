import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  const [currentCount, setcurrentCount] = useState(1);
  let timer = useRef();
  function startClock(){
    let value = setInterval(function(){
        setcurrentCount(c=>c+1);
    },1000)
    timer.current = value;
  }

  function stopClock(){
    clearInterval(timer.current);
  }

  return (
    <>
      {currentCount}
      <br />
      <br />
      <br />
      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>

    </>
  )
}

export default App
