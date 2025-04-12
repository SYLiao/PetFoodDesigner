import React from 'react';
import './RecipeLoading.css';
import ProgressBar from '../progressbar/ProgressBar';

function RecipeLoading() {
  return (
    <div className="recipe-loading-container">
      <img src="/img/dogfitness/fine.png" alt="Dog running" className="dog-running" />
      <p className="loading-text">Analyzing your recipe...</p>
    </div>
  );
}

export default RecipeLoading;
