import React, { useState } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';

function DogProteinChoicePage() {
  const proteinOptions = [
    { id:1, name: 'Beef Recipe', image: './img/protein/beef.png' },
    { id:2, name: 'Chicken Recipe', image: './img/protein/chicken.png' },
    { id:3, name: 'Lamb Recipe', image: './img/protein/Lamb.png' },
    { id:4, name: 'Pork Recipe', image: './img/protein/Pork.png' },
    { id:5, name: 'Salmon Recipe', image: './img/protein/Salmon.png' },
    { id:6, name: 'Veggie Recipe', image: './img/protein/Veggie.png' },
  ];

	const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var selectedProtein = "";
  if (dogData?.proteinId > 0) {
    selectedProtein = proteinOptions[dogData?.proteinId - 1]["name"] || '';
  }

  const handleProteinChoice = (proteinId) => {
    if (proteinId > 0) {
      setDogData({...dogData, proteinId: proteinId});
      selectedProtein = proteinOptions[proteinId - 1]["name"];
    }
  };

  const saveChange = (dogData) => {
    saveDogData(dogData);
  };
  

  return (
    <div className="query-page">
      <ProgressBar progress={40} />
      <h1>Choose your protein</h1>
      <div className="protein-grid">
        {proteinOptions.map((protein) => (
          <div
            key={protein.name}
            className={`protein-option ${
              selectedProtein === protein.name ? 'selected' : ''
            }`}
          >
            <label onClick={() => handleProteinChoice(protein["id"])}>
              <img src={protein["image"]} alt={protein.name} />
              {selectedProtein === protein.name && (
                <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
              )}
              <div className="protein-name">{protein.name}</div>
            </label>
          </div>
        ))}
      </div>
      <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-health-issues-form"} next={"/show-customized-diet"}/>
    </div>
  );
}

export default DogProteinChoicePage;
