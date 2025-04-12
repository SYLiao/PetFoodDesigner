import React, { useState, useEffect } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';
import IngredientDetails from './IngredientDetails';
import LeftContainer from './LeftContainer';
import RecipeLoading from './RecipeLoading';
import useRecipeModel from '../recipes/RecipeModel';

function DogPremixChoicePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  const [nutrientData, setNutrientData] = useState(null);
  const premixOptions = [
    { id: 1, name: 'NND vit/Min Premix', image: './img/premix/premix.png' },
  ];

  const { dogDataModel, saveDogData } = useDogModel();
  const { recipeDataModel, saveRecipeData } = useRecipeModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var selectedPremix = "";

  useEffect(() => {
    console.log(recipeDataModel);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://localhost:8081/mer/customer/get/recipeDetails',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "maxAsh": 0,
              "maxB1": 0,
              "maxCarbohydrates": 0,
              "maxFats": 16,
              "maxFiber": 0,
              "maxMoisture": 0,
              "maxProtein": 27,
              "maxSelenium": 0,
              "minAsh": 0,
              "minB1": 0,
              "minCarbohydrates": 0,
              "minFats": 15,
              "minFiber": 0,
              "minMoisture": 0,
              "minProtein": 25,
              "minSelenium": 0,
              "preferredIngredient": {
                "grainIds": recipeDataModel.grainIdList,
                "mainProteinIds": [
                  recipeDataModel.proteinId
                ],
                "plantProteinIds": recipeDataModel.plantProteinIdList,
                "veggieIds": recipeDataModel.veggieIdList
              }
            }),
          });
        const data = await response.json();
        console.log('API Response:', data?.data);

        if (data?.data?.premixNutrientCurrentValues === undefined || data?.data?.premixNutrientCurrentValues.length === 0) {
          return;
        }
        const nutrientData = [];
        for (let i = 0; i < data?.data?.premixNutrientCurrentValues.length; i++) {
          let name = data?.data?.premixNutrientNames[i];
          let currentValue = data?.data?.premixNutrientCurrentValues[i];
          nutrientData.push({name: name, current: currentValue, recommended: 100})
        }
        setNutrientData(nutrientData);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        // Handle error appropriately (e.g., display an error message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (dogData?.premixId > 0) {
    selectedPremix = premixOptions[dogData?.premixId - 1]["name"] || '';
  }

  const handlePremixChoice = (premixId) => {
    if (premixId > 0) {
      setDogData({ ...dogData, premixId: premixId });
      selectedPremix = premixOptions[premixId - 1]["name"];
    }
  };

  const saveChange = (dogData) => {
    saveRecipeData({ ...recipeDataModel, premix: selectedPremix, premixId: dogData.premixId });
    saveDogData(dogData);
  };

 const handleIngredientDetailsClick = async (id) => {
    try {
      // const response = await fetch(`https://localhost:8081/mer/customer/get/ingredient/${id}`);
      // const data = await response.json();
      // setIngredientDetails(data);
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
        <RecipeLoading />
      ) : (
        <div className='query-container' style={{ flex: 1 }}>
          <ProgressBar progress={40} />
          <h2>Take your premix?</h2>
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            border: '1px solid #f5c6cb',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            The current selection of ingredients can meet the needs of major nutrients, but some minerals and vitamins cannot be satisfied.
            It is recommended that users choose the following premixes or create a recipe with a similar ratio to the selected premix.
            {nutrientData && (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', border: '1px solid #f5c6cb' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #f5c6cb', padding: '8px', textAlign: 'left' }}>Nutrient</th>
                    <th style={{ border: '1px solid #f5c6cb', padding: '8px', textAlign: 'left' }}>Current Ratio</th>
                    <th style={{ border: '1px solid #f5c6cb', padding: '8px', textAlign: 'left' }}>Recommended Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(nutrientData).map((nutrient) => (
                    <tr key={nutrient?.name}>
                      <td style={{ border: '1px solid #f5c6cb', padding: '8px' }}>{nutrient?.name}</td>
                      <td style={{ border: '1px solid #f5c6cb', padding: '8px' }}>{nutrient?.current}%</td>
                      <td style={{ border: '1px solid #f5c6cb', padding: '8px' }}>{nutrient?.recommended}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="protein-grid">
            {premixOptions.map((premix) => (
              <div
                key={premix.name}
                className={`protein-option ${selectedPremix === premix.name ? 'selected' : ''
                  }`}
              >
                <label onClick={() => handlePremixChoice(premix["id"])}>
                  <img src={premix["image"]} alt={premix.name} />
                  {selectedPremix === premix.name && (
                    <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
                  )}
                  <div className="protein-name">{premix.name}</div>
                </label>
                <button
                  className="ingredient-details-button"
                  onClick={() => handleIngredientDetailsClick(premix.id)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
          <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-veggie-choice-page"} next={"/review-recipe-page"} />
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

export default DogPremixChoicePage;
