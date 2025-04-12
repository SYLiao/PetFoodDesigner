import React, { useState, useEffect } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';
import useRecipeModel from '../recipes/RecipeModel';
import IngredientDetails from './IngredientDetails';
import LeftContainer from './LeftContainer';

function DogGrainChoicePage() {
  const [isLoading, setIsLoading] = useState(true);
    const [ingredientDetails, setIngredientDetails] = useState(null);
    const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  const grainOptions = [
    { index:0, name: 'Brown Rice', image: './img/grain/brownrice.png', id:3, isSelect:false },
    { index:1, name: 'Corn', image: './img/grain/corn.png', id:13, isSelect:false },
    { index:2, name: 'Milets', image: './img/grain/milets.png', id:5, isSelect:false },
    { index:4, name: 'Quinoa', image: './img/grain/quinoa.png', id:7, isSelect:false },
    { index:5, name: 'Sorghum', image: './img/grain/sorghum.png', id:9, isSelect:false },
    { index:6, name: 'Spelt', image: './img/grain/spelt.png', id:10, isSelect:false },
  ];

	const { dogDataModel, saveDogData } = useDogModel();
  const { recipeDataModel, saveRecipeData } = useRecipeModel();
  const [recipeData, setRecipeData] = useState(recipeDataModel || null);
  const [recipeOptions, setRecipeOptions] = useState(grainOptions);

  useEffect(() => {
    // Simulate data loading
    if (recipeData?.grainList?.length > 0) {
      recipeData?.grainList.map((selectedGrain) => {
        grainOptions[selectedGrain["index"]]["isSelect"] = true;
      })
    }
    setRecipeOptions(grainOptions);
    setIsLoading(false);
  }, []);

 const handleGrainChoice = (grain) => {
    if (grain["index"] >= 0) {
      const updatedOptions = recipeOptions.map((option, index) => {
        if (index === grain["index"]) {
          return { ...option, isSelect: !option.isSelect };
        }
        return option;
      });
      console.log(updatedOptions);
      setRecipeOptions(updatedOptions);
    }
  };

  const saveChange = (recipeData) => {
    let grainIdList = [];
    let grainList = [];
    recipeOptions.forEach((grainOption, index) => {
      if (grainOption["isSelect"]) {
        grainIdList.push(grainOption["id"]);
        grainList.push(grainOption);
      }
    })
    saveRecipeData({...recipeData, grainIdList: grainIdList, grainList: grainList});
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
      <LeftContainer ingredients={["Brown Rice", "Corn", "Milets"]} />
      {isLoading && recipeOptions ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={40} />
          <h1>Choose your grain</h1>
          <div className="protein-grid">
            {recipeOptions?.map((grain) => (
              <div
                key={grain.name}
                className={`protein-option ${grain.isSelect ? 'selected' : ''
                  }`}
              >
                <label onClick={() => handleGrainChoice(grain)}>
                  <img src={grain["image"]} alt={grain.name} />
                  {grain.isSelect && (
                    <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
                  )}
                  <div className="protein-name">{grain.name}</div>
                   <button
                    className="ingredient-details-button"
                    onClick={() => handleIngredientDetailsClick(grain.id)}
                  >
                    Details
                  </button>
                </label>
              </div>
            ))}
          </div>
          <QueryFooter saveDogData={saveChange} dogData={recipeData} back={"/dog-plant-protein-choice-page"} next={"/dog-veggie-choice-page"} />
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

export default DogGrainChoicePage;
