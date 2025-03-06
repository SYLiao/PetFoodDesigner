import React, { useState, useEffect } from 'react';
import './query-pages.css';
import QueryFooter from '../footer/QueryFooter';
import ProgressBar from '../progressbar/ProgressBar';
import useDogModel from './dogModel';

function DogNameFormPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleNameChange = (event) => {
    setDogData({...dogData, name: event.target.value});
  };

  const saveNameChange = (dogData) => {
    saveDogData(dogData);
  };

  return (
    <div className='query-page'>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={3} />
          <h1>What is your dog’s name?</h1>
          <p>Knowing your dog’s name helps us personalize your plan and makes your dog feel extra special!</p>
          <input
            type="text"
            placeholder="Enter your dog's name"
            value={dogData?.name || ''}
            onChange={handleNameChange}
          />
        </div>
      )}
      <QueryFooter saveDogData={saveNameChange} dogData={dogData} next={"/dog-age-form"} />
    </div>
  );
}

export default DogNameFormPage;
