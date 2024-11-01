import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions.js";

const Timer = () => {
  const [editState, seteditState] = useState({ field: null, value: "" });
  const [time, settime] = useState(10);
  const [timerIsRunning, settimerIsRunning] = useState(false);

  useEffect(() => {
    let clock = null;
    console.log(time);
    if (timerIsRunning && time > 0) {
      clock = setInterval(() => {
        settime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerIsRunning && time === 0) {
      settimerIsRunning(false);
      console.log("Clock stopped");
    }
    return () => {
      if (clock) {
        clearInterval(clock);
      }
    };
  }, [timerIsRunning, time]);

  const handleEditField = (field) => {
    if (editState.field === field) {
      const newTime = {
        ...formatTime(time),
        [field]: editState.value.padStart(2, "0"),
      };

      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );

      settime(calculatedTime);
      // setInitialTime(calculatedTime);

      seteditState({ field: null, value: "" });
    } else {
      settimerIsRunning(false);
      seteditState({
        field,
        value: formatTime(time)[field].replace(/^0+/, ""),
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    seteditState((prevState) => ({ ...prevState, value }));
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div id="main-box">
      <div>
        <div id="timer-circle">
          {editState.field === "hours" ? (
            <input
              type="text"
              value={editState.value}
              onChange={handleChange}
              id="hours"
              placeholder="00"
              autoFocus
              onBlur={handleEditField("hours")}
            />
          ) : (
            <span onClick={() => handleEditField("hours")}>{hours}</span>
          )}
:
          {editState.field === "minutes" ? (
            <input
              type="text"
              value={editState.value}
              onChange={handleChange}
              id="minutes"
              placeholder="00"
              autoFocus
              onBlur={handleEditField("minutes")}
            />
          ) : (
            <span onClick={() => handleEditField("minutes")}>{minutes}</span>
          )}
  :
          {editState.field === "seconds" ? (
            <input
              type="text"
              value={editState.value}
              onChange={handleChange}
              id="seconds"
              placeholder="00"
              autoFocus
              onBlur={handleEditField("seconds")}
            />
          ) : (
            <span onClick={() => handleEditField("seconds")}>{seconds}</span>
          )}
        </div>
      </div>
      <div id="buttons">
        <button onClick={() => settimerIsRunning(!timerIsRunning)}>
          {timerIsRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            settime(10);
            settimerIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;


















// Solution Code:


// import React, { useState, useEffect } from 'react';
// import style from "./Timer.module.css"
// import { formatTime, calculateTime } from '../utils/auxiliaryFunctions.js';

// const Timer = () => {
//   // States to manage time, initial time, running status, and editing fields with values
//   const [time, setTime] = useState(0); // Current time in seconds
//   const [initialTime, setInitialTime] = useState(0); // Time initially set by the user
//   const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running or paused
//   const [editState, setEditState] = useState({ field: null, value: '' }); // State for editing field and value

//   // Effect to update the progress bar as time counts down
//   useEffect(() => {
//     const progress = initialTime > 0 ? ((initialTime - time) / initialTime) * 100 : 0;
//     document.documentElement.style.setProperty('--progress', `${progress}%`);
//   }, [time, initialTime]);

//   // Effect to handle timer countdown when it is running
//   useEffect(() => {
//     let interval = null;
//     if (isRunning && time > 0) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime - 1); // Decrease time by 1 second
//       }, 1000);
//     } else if (time === 0) {
//       setIsRunning(false); // Stop the timer when it reaches 0
//     }
//     return () => {
//       if (interval) clearInterval(interval); // Clear interval to prevent memory leaks
//     };
//   }, [isRunning, time]);

//   // Function to handle editing of time fields
//   const handleEditField = (field) => {

//     if (editState.field === field) {
//       // Edit is completed - save new value with padding and update time
//       const newTime = {
//         ...formatTime(time),
//         [field]: editState.value.padStart(2, '0') // Add leading zeros if necessary
//       };

//       // Use the auxiliary function to calculate the total time in seconds

//       const calculatedTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);

//       // Update time and initial time with the new calculated value
//       setTime(calculatedTime);
//       setInitialTime(calculatedTime);

//       // Reset editing state
//       setEditState({ field: null, value: '' });

//     } else {
//       // Start editing - remove leading zeros
//       setIsRunning(false); // Pause the timer while editing
//       setEditState({ field, value: formatTime(time)[field].replace(/^0+/, '') }); // Set field and remove leading zeros for easier editing

//     }
//   };

//   // Handle input changes for editing time fields (allow only numbers)
//   const handleInputChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 2); // Allow only numbers, max 2 digits
//     setEditState((prevState) => ({ ...prevState, value })); // Update only the value in editState
//   };

//   // Format current time into hours, minutes, and seconds for display
//   const { hours, minutes, seconds } = formatTime(time);

//   return (
//     <div className={style.timerApp}>
//       <div className={style.timerDisplay}>
//         <div className={style.timerCircle}>
//           <div className={style.timerTime}>
//             {editState.field === 'hours' ? (
//               <input
//                 className={style.timeInput}
//                 type="text"
//                 value={editState.value}
//                 onChange={handleInputChange}
//                 onBlur={() => handleEditField('hours')}
//                 autoFocus
//               />
//             ) : (
//               <span className={style.timeUnit} onClick={() => handleEditField('hours')}>{hours}</span>
//             )}
//             :
//             {editState.field === 'minutes' ? (
//               <input
//                 className={style.timeInput}
//                 type="text"
//                 value={editState.value}
//                 onChange={handleInputChange}
//                 onBlur={() => handleEditField('minutes')}
//                 autoFocus
//               />
//             ) : (
//               <span className={style.timeUnit} onClick={() => handleEditField('minutes')}>{minutes}</span>
//             )}
//             :
//             {editState.field === 'seconds' ? (
//               <input
//                 className={style.timeInput}
//                 type="text"
//                 value={editState.value}
//                 onChange={handleInputChange}
//                 onBlur={() => handleEditField('seconds')}
//                 autoFocus
//               />
//             ) : (
//               <span className={style.timeUnit} onClick={() => handleEditField('seconds')}>{seconds}</span>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className={style.actionButtons}>
//         <button className={style.actionButton} onClick={() => setIsRunning(!isRunning)}>
//           {isRunning ? 'Pause' : 'Start'} {/* Toggle between Start and Pause */}
//         </button>
//         <button className={style.actionButton} onClick={() => { setTime(0); setInitialTime(0); setIsRunning(false); }}>
//           Reset {/* Reset the timer */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Timer;
