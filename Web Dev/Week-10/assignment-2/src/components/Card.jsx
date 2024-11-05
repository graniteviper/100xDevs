import React, { useContext, useEffect,useState } from "react";
import { DataContext } from "../context/DataContext";


const Card = () => {
  const { Data, setData } = useContext(DataContext);
  const [name, setname] = useState(null)
  const [imageUrl, setimageUrl] = useState("")

  useEffect(() => {
    // console.log("useEffect mounted");
    
    if (Data == null) {
      console.log("No Data found");
    }
    else{
      const namevar =
        Data.data.results[0].name.title +
        " " +
        Data.data.results[0].name.first +
        " " +
        Data.data.results[0].name.last;
        setname(namevar)
        const url = Data.data.results[0].picture.thumbnail
        setimageUrl(url)
        console.log(Data);
    }
  }, [Data]);

  return (
    <div className="flex flex-col items-center justify-center m-3 border-2 gap-2 border-black rounded-lg border-solid absolute min-h-[20vh] min-w-[10vw]">
      <div className="border-2 border-black border-solid min-h-[7vh] min-w-[4vw] flex justify-center items-center">
        <img src={imageUrl} alt="" />
      </div>
      <div className="min-h-[4vh] min-w-[8vw] border-2 border-black border-solid flex justify-center items-center">
        {name}
      </div>
    </div>
  );
};

export default Card;
