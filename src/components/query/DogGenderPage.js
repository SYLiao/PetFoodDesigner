import React, { useState } from 'react';
import './query-pages.css';
import QueryFooter from '../footer/QueryFooter';
import useDogModel from './dogModel';
import ProgressBar from '../progressbar/ProgressBar';

function DogGenderPage() {
  const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);

  const handleGenderSelect = (genderValue) => {
    setDogData({...dogData, gender: genderValue});
    console.log(dogData);
  };

  const handleNeuteredSelect = (value) => {
    if (value) {
      setDogData({...dogData, lifePhaseId: '1'});
    } else {
      setDogData({...dogData, lifePhaseId: '2'});
    }
    
  };

  const handleSpayedSelect = (value) => {
    if (value) {
      setDogData({...dogData, lifePhaseId: '3'});
    } else {
      setDogData({...dogData, lifePhaseId: '2'});
    }
  };

  const saveAgeChange = (dogData) => {
    saveDogData(dogData);
  };

  return (
    <div className="query-page">
      <ProgressBar progress={12} />
      <h1>What is Shaw's gender?</h1>
      <div className="options-container">
        <button
          className={`${dogData?.gender === 'male' ? 'selected' : 'unselected'} option-button gender-option`}
          onClick={() => handleGenderSelect('male')}
        >
          <i className="bi bi-gender-male"></i> Male
        </button>
        <button
          className={`${dogData?.gender === 'female' ? 'selected' : 'unselected'} option-button gender-option`}
          onClick={() => handleGenderSelect('female')}
        >
          <i className="bi bi-gender-female"></i> Female
        </button>
      </div>

      {dogData?.gender === 'male' && (
        <div className="neutered-spayed-container">
          <h2>Is Shaw neutered?</h2>
          <div className="options-container">
            <button onClick={() => handleNeuteredSelect(true)} className={`option-button neutered-spayed-option ${dogData?.lifePhaseId === '1' ? 'selected' : 'unselected'}`}>
              Yes
            </button>
            <button onClick={() => handleNeuteredSelect(false)} className={`option-button neutered-spayed-option ${dogData?.lifePhaseId === '2' ? 'selected' : 'unselected'}`}>
              No
            </button>
          </div>
        </div>
      )}

      {dogData?.gender === 'female' && (
        <div className="neutered-spayed-container">
          <h2>Is {dogDataModel?.name} spayed?</h2>
          <div className="options-container">
            <button onClick={() => handleSpayedSelect(true)} className={`option-button neutered-spayed-option ${dogData?.lifePhaseId === '3' ? 'selected' : 'unselected'}`}>
              Yes
            </button>
            <button onClick={() => handleSpayedSelect(false)} className={`option-button neutered-spayed-option ${dogData?.lifePhaseId === '2' ? 'selected' : 'unselected'}`}>
              No
            </button>
          </div>
        </div>
      )}

      <QueryFooter saveDogData={saveAgeChange} dogData={dogData} back={"/dog-breed-form"} next={"/dog-weight-form"}/>
    </div>
  );
}

export default DogGenderPage;
