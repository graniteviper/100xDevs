// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function useCounter(){
//   const [count, setCount] = useState(0)
//   function increaseCount(){
//     setCount(c=>c+1)
//   }
//   return {
//     count:count,
//     increaseCount:increaseCount,
//   }
// }

// function App() {

//   return (
//     <>
//       <Counter/>
//       <Counter/>
//       <Counter/>
//     </>
//   )
// }

// // function Counter(){
// //   const {count,increaseCount} = useCounter();
// //   return (
// //     <div>
// //         <button onClick={increaseCount}>Increase {count}</button>
// //       </div>
// //   )
// // }

// export default App


import './App.css'
import { useState,useEffect } from 'react'
import { usePostTitle } from './hooks/useFetch'


function App(){

  const postTitle = usePostTitle();

  return (

    <div>
        {postTitle}
    </div>
  )
}

export default App