import React, { useState, useEffect } from 'react';

const IngredientFormPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selections, setSelections] = useState([]);
  const [ingredientIds, setIngredientIds] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);

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
        'https://ec2-18-117-254-10.us-east-2.compute.amazonaws.com:8081/mer/customer/get/recipeDetails',
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
      const data = await response.json();
      setRecipeDetails(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleSelectionChange = (index, selectedIndex, value) => {
    console.log(index);
    console.log(value);
    const newSelections = [...selections];
    newSelections[index] = value;
    setSelections(newSelections);
    const newIngredientIds = [...ingredientIds];
    newIngredientIds[index] = selectedIndex;
    setIngredientIds(newIngredientIds);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}>
          <label htmlFor={`ingredient-${index}`}>Ingredient {index + 1}:</label>
          <select
            id={`ingredient-${index}`}
            value={selections[index]}
            onChange={(e) => handleSelectionChange(index, e.target.options.selectedIndex, e.target.value)}
          >
            <option value="">Select Ingredient</option>
            {ingredients.map((ingredient, index) => (
              <option key={index + 1} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit">Get Recipe Details</button>

      {recipeDetails && (
        <div>
          <h2>Recipe Details:</h2>
          <pre>{JSON.stringify(recipeDetails, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default IngredientFormPage;
