import React from "react";
import { useRef, useState } from "react";
import Data from "./Data";
import MainForm from "./MainForm.jsx"

const Form = () => {

  const [data, setdata] = useState([]);
  const [showTable, setshowTable] = useState(false);

  

  return (
    <>
      {!showTable && <MainForm setdata = {setdata} data={data} setshowTable = {setshowTable}/>}

      {showTable && <Data data = {data} setshowTable = {setshowTable}/>}
    </>
  );
};

export default Form;
