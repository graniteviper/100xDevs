import React from 'react'
import Table from "./Table.jsx"

const Data = ({data,setshowTable}) => {

  function toggle(){
    setshowTable(false)
  }

  return (
    <>
      <div>
        <Table data={data}/>
      </div>
      <div>
        <button onClick={toggle}>
          Back to Form
        </button>
      </div>
    </>
  )
}

export default Data