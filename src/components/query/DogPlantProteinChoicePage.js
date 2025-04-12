import React, { useState, useEffect } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';
import useRecipeModel from '../recipes/RecipeModel';
import IngredientDetails from './IngredientDetails';
import LeftContainer from './LeftContainer';

function DogPlantProteinChoicePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  const proteinOptions = [
    { index:0, name: 'Chia Seeds', image: './img/plantprotein/chiaseed.png', id:15, isSelect:false },
    { index:1, name: 'Chickpeas', image: './img/plantprotein/chickpeas.png', id:44, isSelect:false },
    { index:2, name: 'Flaxseed', image: './img/plantprotein/flaxseed.png', id:17, isSelect:false },
    { index:3, name: 'Hemp Seeds', image: './img/plantprotein/hempseed.png', id:18, isSelect:false },
    { index:4, name: 'Pumpkin Seeds', image: './img/plantprotein/pumpkinseed.png', id:19, isSelect:false },
    { index:5, name: 'Sunflower Seeds', image: './img/plantprotein/sunflowerseed.png', id:20, isSelect:false },
  ];

	const { dogDataModel, saveDogData } = useDogModel();
  const { recipeDataModel, saveRecipeData } = useRecipeModel();
  const [recipeData, setRecipeData] = useState(recipeDataModel || null);
  const [recipeOptions, setRecipeOptions] = useState(proteinOptions);

  useEffect(() => {
    // Simulate data loading
    if (recipeData?.plantProteinList?.length > 0) {
      recipeData?.plantProteinList.map((selectedProtein) => {
        proteinOptions[selectedProtein["index"]]["isSelect"] = true;
      })
    }
    setRecipeOptions(proteinOptions);
    setIsLoading(false);
  }, []);

 const handleProteinChoice = (protein) => {
    if (protein["index"] >= 0) {
      const updatedOptions = recipeOptions.map((option, index) => {
        if (index === protein["index"]) {
          return { ...option, isSelect: !option.isSelect };
        }
        return option;
      });
      console.log(updatedOptions);
      setRecipeOptions(updatedOptions);
    }
  };

  const saveChange = (recipeData) => {
    let proteinIdList = [];
    let proteinList = [];
    recipeOptions.forEach((proteinOption, index) => {
      if (proteinOption["isSelect"]) {
        proteinIdList.push(proteinOption["id"]);
        proteinList.push(proteinOption);
      }
    })
    saveRecipeData({...recipeData, plantProteinIdList: proteinIdList, plantProteinList: proteinList});
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
      <LeftContainer ingredients={["Chia Seeds", "Chickpeas", "Flaxseed"]} />
      {isLoading && recipeOptions ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={40} />
          <h1>Choose your protein</h1>
          <div className="protein-grid">
            {recipeOptions?.map((protein) => (
              <div
                key={protein.name}
                className={`protein-option ${protein.isSelect ? 'selected' : ''
                  }`}
              >
                <label onClick={() => handleProteinChoice(protein)}>
                  <img src={protein["image"]} alt={protein.name} />
                  {protein.isSelect && (
                    <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
                  )}
                  <div className="protein-name">{protein.name}</div>
                  <button
                    className="ingredient-details-button"
                    onClick={() => handleIngredientDetailsClick(protein.id)}
                  >
                    Details
                  </button>
                </label>
              </div>
            ))}
          </div>
          <QueryFooter saveDogData={saveChange} dogData={recipeData} back={"/dog-protein-choice-page"} next={"/dog-grain-choice-page"} />
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

export default DogPlantProteinChoicePage;
