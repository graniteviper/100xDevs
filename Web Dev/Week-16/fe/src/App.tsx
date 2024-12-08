import './App.css'
import { useEffect,useState,useRef } from 'react'

function App() {
  const [ws, setWs] = useState();
  const inputRef = useRef();
  
  function sendMessage(){
    const inputValue = inputRef.current.value;
    ws.send(inputValue)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setWs(ws)
    ws.onmessage = (e)=>{
      alert(e.data);
    }
  }, [])

  return (
    <>
      <div>
        <input ref={inputRef} type="text" placeholder='Message...'/>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
