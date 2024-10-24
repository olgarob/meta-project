import React from "react";
import {useEffect } from 'react';
import "./tracker_styles.css";


const StepTracker = ({stepCounter}) => {
  const progressSteps = document.querySelectorAll(".progress-step");
  const progress = document.getElementById("progress");
  
  const updateProgressbar = () => {
    progressSteps.forEach((progressStep, idx) => {
      if (idx < stepCounter + 1) {
        progressStep.classList.add("progress-step-active");
        progressStep.style.setProperty('--tagcolor', '#495e57');
      } else {
        progressStep.classList.remove("progress-step-active");
        progressStep.style.setProperty('--tagcolor', '#666');
      }
    });
  
    const progressActive = document.querySelectorAll(".progress-step-active");
    const barWidth= ((progressActive.length - 1) / (progressSteps.length - 1)) * 100;
    progress.style.width =((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
    //  progress.style.width =((stepCounter - 1) / 3) * 100 + "%";
    //  progress.style.width =`${barWidth}%`
    
  }

  
 useEffect(() => {
    if (progress) {
      updateProgressbar();}
    
  }, [stepCounter]);

  return (
    //Progress bar
    <div className="progressbar">
      <div className="progress" id="progress"></div>
      <div className="progress-step progress-step-active" data-title="Details"></div>
      <div className="progress-step" data-title="Confirm"></div>
      <div className="progress-step" data-title="End"></div>
    </div>
  )
}

export default StepTracker;
