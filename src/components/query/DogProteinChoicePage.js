import React, { useState, useEffect } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';
import IngredientDetails from './IngredientDetails';
import LeftContainer from './LeftContainer';
import useRecipeModel from '../recipes/RecipeModel';

function DogProteinChoicePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  const proteinOptions = [
    { id:64, name: 'Beef', image: './img/protein/beef.png' },
    { id:68, name: 'Chicken', image: './img/protein/chicken.png' },
    { id:79, name: 'Lamb', image: './img/protein/Lamb.png' },
    { id:81, name: 'Pork', image: './img/protein/Pork.png' },
    { id:76, name: 'Turkey', image: './img/protein/Salmon.png' },
  ];

	const { dogDataModel, saveDogData } = useDogModel();
  const { recipeDataModel, saveRecipeData } = useRecipeModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var selectedProtein = "";

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

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
    saveRecipeData({...recipeDataModel, protein: selectedProtein, proteinId: dogData.proteinId});
    saveDogData(dogData);
  };

  const handleIngredientDetailsClick = async (id) => {
    try {
      const response = await fetch(`https://localhost:8081/mer/customer/get/ingredient/${id}`);
      const data = await response.json();
      console.log(data);
      setIngredientDetails(data.data);
      setShowIngredientDetails(true);
    } catch (error) {
      console.error('Error fetching ingredient details:', error);
      // Handle error appropriately (e.g., display an error message)
    }
  };

  const handleCloseIngredientDetails = () => {
    setShowIngredientDetails(false);
    setIngredientDetails(null);
  };
  

  return (
    <div className="query-page" style={{ display: 'flex' }}>
      <LeftContainer />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container' style={{ flex: 1 }}>
          <ProgressBar progress={40} />
          <h1>Choose your protein</h1>
          <div className="protein-grid">
            {proteinOptions.map((protein) => (
              <div
                key={protein.name}
                className={`protein-option ${selectedProtein === protein.name ? 'selected' : ''
                  }`}
              >
                <label onClick={() => handleProteinChoice(protein["id"])}>
                  <img src={protein["image"]} alt={protein.name} />
                  {selectedProtein === protein.name && (
                    <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
                  )}
                  <div className="protein-name">{protein.name}</div>
                </label>
                <button
                  className="ingredient-details-button"
                  onClick={() => handleIngredientDetailsClick(protein.id)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
          <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-health-issues-form"} next={"/dog-plant-protein-choice-page"} />
          {showIngredientDetails && (
            <IngredientDetails
              ingredient={ingredientDetails}
              onClose={handleCloseIngredientDetails}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DogProteinChoicePage;
