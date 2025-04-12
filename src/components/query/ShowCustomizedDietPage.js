import React, { useState, useEffect } from 'react';
import './query-pages.css';
import './ShowCustomizedDietPage.css';
import QueryFooter from '../footer/QueryFooter';
import ProgressBar from '../progressbar/ProgressBar';
import useDogModel from './dogModel';
import { useParams } from 'react-router-dom';
import RecipeLoading from './RecipeLoading';
import ReviewRecipe from './ReviewRecipe';
import styles from './ShowCustomizedDietPage.module.css';
import useRecipeModel from '../recipes/RecipeModel';

function ShowCustomizedDietPage() {
  const { dietId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeModel, setRecipeModel] = useState(null);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const { dogDataModel } = useDogModel();
  const { recipeDataModel, saveRecipeData } = useRecipeModel();

  const toggleRecipeDetails = () => {
    setShowRecipeDetails(!showRecipeDetails);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        let mainProteinIds = [];
        let plantProteinIds = [];
        let grainIds = [];
        let veggieIds = [];
        let dairyIds = [];
        let premixIds = [];
        if (recipeDataModel !== undefined) {
          if (recipeDataModel["proteinId"]) {
            mainProteinIds.push(recipeDataModel["proteinId"]);
          }
          if (recipeDataModel["plantProteinIdList"]?.length > 0) {
            recipeDataModel["plantProteinIdList"].map((id) => {plantProteinIds.push(id)});
          }
          if (recipeDataModel["grainIdList"]?.length > 0) {
            recipeDataModel["grainIdList"].map((id) => {grainIds.push(id)});
          }
          if (recipeDataModel["veggieIdList"]?.length > 0) {
            recipeDataModel["veggieIdList"].map((id) => {veggieIds.push(id)});
          }
        }
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
                "grainIds": [
                  5
                ],
                "mainProteinIds": [
                  1
                ],
                "plantProteinIds": [
                  2, 3, 4
                ],
                "veggieIds": [
                  6
                ]
              }
            }),
          });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // Mock recipe data
        const recipe = {
          description: "A delicious and nutritious recipe for your dog.",
          ingredientNames: result?.data?.ingredientNames,
          ingredientValues: result?.data?.ingredientValues,
          nutrientNames: result?.data?.nutrientNames,
          nutrientValues: result?.data?.nutrientValues,
          price: result?.data?.price
        };
        const price = 500;
        const ingredients = {};

        let dietData;
        if (dietId) {
          // Fetch diet data by dietId (replace with actual API call later)
          dietData = {
            recipe: {
              name: "Mock Chicken Recipe (Diet ID: " + dietId + ")",
              description: "This is a mock recipe description for diet ID " + dietId + ".",
              caloriesPerKg: 1200,
              crudeProtein: 30,
              crudeFat: 20,
              crudeFiber: 5,
              moisture: 10
            },
            dailyCalories: 500,
            feedFrequency: 2
          };
        } else {
          // Use existing dogDataModel to fetch recipe (replace with actual API call later)
          dietData = {
            recipe: {
              name: "Mock Chicken Recipe (Dog Data)",
              description: "This is a mock recipe description based on dog data.",
              caloriesPerKg: 1100,
              crudeProtein: 28,
              crudeFat: 18,
              crudeFiber: 4,
              moisture: 8
            },
            dailyCalories: 450,
            feedFrequency: 3
          };
        }
        setRecipeModel({
          recipe: recipe,
          price: price,
          ingredients: ingredients,
          dietData: dietData
        });
      } catch (error) {
        console.error("Could not fetch recipe:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dietId, dogDataModel]);

  const mockDogDataModel = {
    name: "Mock Dog",
    breed: "Golden Retriever",
    weight: 25,
    age: 5,
    gender: "Male",
    activeLevel: "Active"
  };

  if (isLoading) {
    return (
      <div className="customized-diet-page query-page">
        <RecipeLoading />
      </div>
    );
  }

  return (
    <div className="customized-diet-page query-page">
      <div className='query-container'>
        <ProgressBar progress={51} />
        <h1>{mockDogDataModel?.name}'s Customized Diet</h1>
        <p>Based on what you have told us about Shaw, our nutritionist recommends the following recipes. Let Shaw know that yumminess is on the way!</p>

        {recipeModel && (
          <div className="recipe-card">
            <img className="recipe-image" src="./img/recipe/chicken.png" alt="Recipe" />
            <div className="recipe-details">
              <h4 className="recipe-name">{recipeModel?.dietData?.recipe?.name}</h4>
              <div className="daily-calories">Daily Calories: {recipeModel?.dietData?.dailyCalories}</div>
              <div className="feed-frequency">Feed Frequency: {recipeModel?.dietData?.feedFrequency}</div>
              <div className='recipe-description'><p><span>{recipeModel?.dietData?.recipe?.description}</span></p></div>
              <a onClick={toggleRecipeDetails} style={{fontSize: '16px', color: '#007bff', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px'}}>Show Recipe Details</a>
              <table className="nutritional-profile">
                <tbody>
                  <tr>
                    <td colSpan="2"><strong>Nutritional Profile</strong></td>
                  </tr>
                  <tr>
                    <td>ME content, Kcal/kg</td>
                    <td>{recipeModel?.dietData?.recipe?.caloriesPerKg}</td>
                  </tr>
                  <tr>
                    <td>Crude Protein, %</td>
                    <td>{recipeModel?.dietData?.recipe?.crudeProtein}</td>
                  </tr>
                  <tr>
                    <td>Crude Fat, %</td>
                    <td>{recipeModel?.dietData?.recipe?.crudeFat}</td>
                  </tr>
                  <tr>
                    <td>Crude Fiber, %</td>
                    <td>{recipeModel?.dietData?.recipe?.crudeFiber}</td>
                  </tr>
                  <tr>
                    <td>Moisture, %</td>
                    <td>{recipeModel?.dietData?.recipe?.moisture}</td>
                  </tr>
                </tbody>
              </table>
              <div className="button-container">
                <div className="select-recipe-button">
                  Select this Recipe
                </div>
              </div>
            </div>
          </div>
        )}
        {showRecipeDetails && (
          <div className={styles["floating-recipe"]}>
            <ReviewRecipe onClose={toggleRecipeDetails}/>
            <button onClick={toggleRecipeDetails}>Close</button>
          </div>
        )}

        <QueryFooter />
      </div>
    </div>
  );
}

export default ShowCustomizedDietPage;
