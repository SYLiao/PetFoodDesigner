import React, { useState, useEffect } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';

function ShawDietChoicePage() {
  const [isLoading, setIsLoading] = useState(true);
  const dietOptions = [
    { id:1, name: 'Quick match' },
    { id:2, name: 'Customize your diet' },
    { id:3, name: 'Expert support' },
  ];

	const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var selectedDiet = "";

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (dogData?.dietId > 0) {
    selectedDiet = dietOptions[dogData?.dietId - 1]["name"] || '';
  }

  const handleDietChoice = (dietId) => {
    if (dietId > 0) {
      setDogData({...dogData, dietId: dietId});
      selectedDiet = dietOptions[dietId - 1]["name"];
    }
  };

  const saveChange = (dogData) => {
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
          <ProgressBar progress={40} />
          <h1>Please select the way for Shaw's diet</h1>
          <div className="diet-grid">
            {dietOptions.map((diet) => (
              <div
                key={diet.name}
                className={`diet-option ${selectedDiet === diet.name ? 'selected' : ''
                  }`}
              >
                <label onClick={() => handleDietChoice(diet["id"])}>
                  {selectedDiet === diet.name && (
                    <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
                  )}
                  <div className="protein-name">{diet.name}</div>
                </label>
              </div>
            ))}
          </div>
          <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-health-issues-form"} next={"/show-customized-diet"} />
        </div>
      )}
    </div>
  );
}

export default ShawDietChoicePage;
