import {React, useState, useEffect} from 'react';
import './query-pages.css';
import QueryFooter from '../footer/QueryFooter';
import useDogModel from './dogModel';
import ProgressBar from '../progressbar/ProgressBar';

function DogWeightPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleWeightChange = (event) => {
    setDogData({...dogData, weight: event.target.value});
  };

  const saveWeightChange = (dogData) => {
    saveDogData(dogData);
  };

  return (
    <div className="query-page">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={15} />
          <h1>What is {dogDataModel?.name}'s current weight?</h1>
          <p>No judgment here. We use this information to help your dog stay on track, slim down or bulk up in a healthy, sustainable way.</p>

          <div className="input-row">
            <label htmlFor="dogWeight">Dog's Weight (lb):</label>
            <input type="number" name="dogWeight" className="weight-input" value={dogData?.weight} placeholder='0' onChange={handleWeightChange} />
          </div>

          <QueryFooter saveDogData={saveWeightChange} dogData={dogData} back={"/dog-gender-form"} next={"/dog-body-condition-form"} />
        </div>
      )}
    </div>
  );
}

export default DogWeightPage;
