import React from 'react';
import './ProgressBar.css';

const steps = ["Your Dog", "Recipe", "Plan", "Checkout"];

function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-full"></div>
      <div className="progress" style={{ width: `${progress}%` }}>
      </div>
      {steps.map((step, index) => (
        <div key={step} className="step-container">
          <div className={`circle ${index * 25 < progress ? 'active' : ''}`}>{index + 1}</div>
          <div className={`step-name ${index * 25 < progress ? 'active' : ''}`}>{step}</div>
        </div>
      ))}
    </div >
  );
}

export default ProgressBar;
