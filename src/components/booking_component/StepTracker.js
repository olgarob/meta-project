import React from "react";
import {useEffect } from 'react';
import "./tracker_styles.css";

const StepTrackerNew = ({stepCounter, steps}) => {

  const blacktxt={};
  blacktxt["--tagcolor"] = "var(--black)";
  const graytxt={};
  graytxt["--tagcolor"] = "#666)";
  
  const progress = document.getElementById("progress");
  
  const updateProgressbar = () => {
    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width =((progressActive.length - 1) / (steps.length - 1)) * 100 + "%";
  }
  
 useEffect(() => {
    if (progress) {
      updateProgressbar();}
  }, [stepCounter]);

  return (
    //Progress bar
    <div className="progressbar">
      <div className="progress" id="progress"></div>
      {steps.map((step, idx) => {
        return (
          <div key={idx}
            className={`progress-step ${stepCounter+1 > idx ? 'progress-step-active' : ''}`} 
            data-title={step} 
             style={stepCounter+1 > idx ? blacktxt  : graytxt}
          >
        </div>
        )
      })}
    </div>
  )
}

export default StepTrackerNew;