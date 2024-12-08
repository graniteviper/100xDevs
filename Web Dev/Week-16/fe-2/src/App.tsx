import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {

  const [messages, setmessages] = useState([])

  const inputRef = useRef("")
  const wsRef: WebSocket = useRef();

  function sendMessage(){
    const inputValue = inputRef.current.value;
    wsRef.current.send(JSON.stringify({
      type:"chat",
      payload:{
        message: inputValue,
      }
    }))
    inputRef.current.value = "";
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = (ev)=>{
      setmessages(m=> [...m,ev.data]);
    }

    wsRef.current = ws; 

    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        "type" : "join",
        "payload" : {
          "roomId" : "red",
        }
      }))
    }

    //Clean Up function:
    return ()=>{
      ws.close()
    }
  }, [])
  

  return (
    <>
      <div className="bg-black w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="bg-zinc-900 p-3 gap-2 w-[30vw] h-[60vh] rounded-lg flex flex-col justify-between items-center">
          <div className="rounded-md text-white p-6 bg-zinc-900 flex flex-col items-start justify-start gap-2 w-full h-4/5">
            {messages.map(message => <div className="bg-black text-orange-500 p-2 rounded-sm m-1">{message}</div>)}
          </div>
          <div className="bg-orange-500 w-full h-0.5"></div>
          <div className="flex bg-zinc-900 items-center justify-around w-full h-1/5">
            <input ref={inputRef} type="text" className= "rounded-md w-3/5 h-1/2 text-center text-xl"/>
            <button className="bg-orange-500 h-1/2 w-1/5 rounded-full text-xl" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
