import React, { useState, useEffect } from 'react';
import './IngredientFormPage.css';

const EasyIngredientFormPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selections, setSelections] = useState([]);
  const [ingredientIds, setIngredientIds] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [nutritionDetails, setNutritionDetails] = useState([]);
  const [numIngredients, setNumIngredients] = useState(3);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          'https://ec2-18-117-254-10.us-east-2.compute.amazonaws.com:8081/mer/customer/get/ingredients'
        );
        const data = await response.json();
        console.log(data);
        setIngredients(data.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selections);

    try {
      const response = await fetch(
        'https://localhost:8081/mer/customer/get/recipeDetails',
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
              "dairyId": 0,
              "fishId": 0,
              "grainId": 0,
              "ingredientIds": ingredientIds,
              "meatId": 0,
              "plantId": 0,
              "vegetableId": 0
            }
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData === undefined || responseData?.resultCode != 200) {
        return;
      }
      let data = responseData.data;
      setRecipeDetails(data?.ingredientContents);
      if (data?.nutrientNames?.length === data?.nutrientValues?.length) {
        let nutrientDetails = [];
        for (let i = 0; i < data.nutrientNames.length; i++) {
            nutrientDetails.push({nutrientName: data.nutrientNames[i], nutrientValue: data.nutrientValues[i]});
        }
        setNutritionDetails(nutrientDetails);
        console.log(nutritionDetails)
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleSelectionChange = (index, selectedIndex, value) => {
    const newSelections = [...selections];
    newSelections[index] = value;
    setSelections(newSelections);
    const newIngredientIds = [...ingredientIds];
    newIngredientIds[index] = selectedIndex;
    setIngredientIds(newIngredientIds);
    console.log(selections);
  };

  const handleRemoveIngredient = (index) => {
    const newSelections = [...selections];
    newSelections.splice(index, 1);
    setSelections(newSelections);

    const newIngredientIds = [...ingredientIds];
    newIngredientIds.splice(index, 1);
    setIngredientIds(newIngredientIds);

    setNumIngredients(numIngredients - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="ingredient-form">
      {Array.from({ length: numIngredients }).map((_, index) => {
        let label;
        if (index === 0) {
          label = "Main Protein";
        } else if (index === 1) {
          label = "Sub-Protein";
        } else if (index === 2) {
          label = "Grain";
        }
        return (
          <div key={index} className="form-group">
            <label htmlFor={`ingredient-${index}`} className="form-label">{label}:</label>
            <select
              id={`ingredient-${index}`}
              value={selections[index]}
              onChange={(e) => handleSelectionChange(index, e.target.options.selectedIndex, e.target.value)}
              className="form-select"
            >
              <option value="">Select Ingredient</option>
              {ingredients.map((ingredient, index) => (
                <option key={index + 1} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      {selections.length === numIngredients && (
        <button type="submit" className="submit-button">Get Recipe Details</button>
      )}

      {recipeDetails && (
        <div>
          <div>
                <h2>Recipe Details:</h2>
                <pre>{JSON.stringify(recipeDetails, null, 2)}</pre>
            </div>
            <div className="vsp-easyrecipe-details" style={{ textAlign: 'left', lineHeight: '18px', textAlign: 'center' }}>
                    <table style={{ width: '80%', margin: '0 auto', textAlign: "left" }}>
                      <tbody>
                        <tr>
                          <td colSpan="2"><strong>Nutritional Profile</strong></td>
                        </tr>
                        {
                            nutritionDetails.map((nutritionDetail, index) => {
                                return (
                                  <tr>
                                      <td>{nutritionDetail.nutrientName}, %</td>
                                      <td>{nutritionDetail.nutrientValue}</td>
                                  </tr>
                                )
                            })
                        }
                      </tbody>
                    </table>
                    <div className="button top-marginNOTUSED w-inline-block" style={{ padding: '7px', width: 'max-content', color: 'black', fontStyle: 'normal', margin: '20px auto' }}>
                      <div onclick="selectrecommendedproduct(this,2298, 1,0,20, 10);" className="select-recipe button-inner-wrap" questionid="58" style={{ fontSize: '16px' }}>
                        <div className="cf">
                          Select this Recipe
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
      )}
    </form>
  );
};

export default EasyIngredientFormPage;
