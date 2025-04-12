import React, { useState, useEffect } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';
import useRecipeModel from '../recipes/RecipeModel';
import IngredientDetails from './IngredientDetails';
import LeftContainer from './LeftContainer';

function DogVeggieChoicePage() {
  const [isLoading, setIsLoading] = useState(true);
    const [ingredientDetails, setIngredientDetails] = useState(null);
    const [showIngredientDetails, setShowIngredientDetails] = useState(false);
  const veggieOptions = [
    { index:0, name: 'Apples', image: './img/veggie/apples.png', id:33, isSelect:false },
    { index:1, name: 'Bananas', image: './img/veggie/bananas.png', id:34, isSelect:false },
    { index:2, name: 'Beets', image: './img/veggie/beets.png', id:54, isSelect:false },
    { index:3, name: 'Blueburries', image: './img/veggie/blueburries.png', id:35, isSelect:false },
    { index:4, name: 'Brussel Sprouts', image: './img/veggie/brusselsprouts.png', id:54, isSelect:false },
    { index:5, name: 'Butternut Squash', image: './img/veggie/butternutsquash.png', id:52, isSelect:false },
    { index:6, name: 'Carrots', image: './img/veggie/carrots.png', id:56, isSelect:false },
    { index:7, name: 'Cranberries', image: './img/veggie/cranberries.png', id:36, isSelect:false },
    { index:8, name: 'Green Beans', image: './img/veggie/greenbeans.png', id:43, isSelect:false },
    { index:9, name: 'Watermelon', image: './img/veggie/mangos.png', id:42, isSelect:false },

    // No Peaches in database. Need to find a replacement
    { index:10, name: 'Peaches', image: './img/veggie/peaches.png', id:12, isSelect:false },
    { index:12, name: 'Pineapple', image: './img/veggie/pineapple.png', id:39, isSelect:false },

    // No Raspberries in database. Need to find a replacement
    { index:13, name: 'Red Raspberries', image: './img/veggie/redraspberries.png', id:12, isSelect:false },
    { index:14, name: 'Strawberries', image: './img/veggie/strawberries.png', id:41, isSelect:false },
    { index:15, name: 'Sweet Potatoes', image: './img/veggie/sweetpotatoes.png', id:62, isSelect:false },
    { index:16, name: 'Potatoes', image: './img/veggie/whitepotatoes.png', id:59, isSelect:false },
    { index:17, name: 'Zucchini', image: './img/veggie/zucchini.png', id:63, isSelect:false },
  ];

	const { dogDataModel, saveDogData } = useDogModel();
  const { recipeDataModel, saveRecipeData } = useRecipeModel();
  const [recipeData, setRecipeData] = useState(recipeDataModel || null);
  const [recipeOptions, setRecipeOptions] = useState(veggieOptions);

  useEffect(() => {
    // Simulate data loading
    if (recipeData?.veggieList?.length > 0) {
      recipeData?.veggieList.map((selectedVeggie) => {
        veggieOptions[selectedVeggie["index"]]["isSelect"] = true;
      })
    }
    setRecipeOptions(veggieOptions);
    setIsLoading(false);
  }, []);

 const handleVeggieChoice = (veggie) => {
    if (veggie["index"] > 0) {
      const updatedOptions = recipeOptions.map((option, index) => {
        if (index === veggie["index"]) {
          return { ...option, isSelect: !option.isSelect };
        }
        return option;
      });
      console.log(updatedOptions);
      setRecipeOptions(updatedOptions);
    }
  };

  const saveChange = (recipeData) => {
    let veggieIdList = [];
    let veggieList = [];
    recipeOptions.forEach((veggieOption, index) => {
      if (veggieOption["isSelect"]) {
        veggieIdList.push(veggieOption["id"]);
        veggieList.push(veggieOption);
      }
    })
    saveRecipeData({...recipeData, veggieIdList: veggieIdList, veggieList: veggieList});
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
      <LeftContainer ingredients={["Apples", "Bananas", "Beets"]} />
      {isLoading && recipeOptions ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={40} />
          <h1>Choose your veggie</h1>
          <div className="protein-grid">
            {recipeOptions?.map((veggie) => (
              <div
                key={veggie.name}
                className={`protein-option ${veggie.isSelect ? 'selected' : ''
                  }`}
              >
                <label onClick={() => handleVeggieChoice(veggie)}>
                  <img src={veggie["image"]} alt={veggie.name} />
                  {veggie.isSelect && (
                    <span className="checkmark"><i className="bi bi-check-circle-fill"></i></span>
                  )}
                  <div className="protein-name">{veggie.name}</div>
                   <button
                    className="ingredient-details-button"
                    onClick={() => handleIngredientDetailsClick(veggie.id)}
                  >
                    Details
                  </button>
                </label>
              </div>
            ))}
          </div>
          <QueryFooter saveDogData={saveChange} dogData={recipeData} back={"/dog-plant-protein-choice-page"} next={"/dog-premix-choice-page"} />
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

export default DogVeggieChoicePage;
