import React, { useState, useEffect, useCallback } from 'react';
import './query-pages.css';
import './regular.css';
import styles from './ReviewRecipePage.module.css';
import QueryFooter from '../footer/QueryFooter';
import ProgressBar from '../progressbar/ProgressBar';
import RecipeLoading from './RecipeLoading';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useRecipeModel from '../recipes/RecipeModel';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function ReviewRecipe({ onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipeModel, setRecipeModel] = useState({});
  const { recipeDataModel, saveRecipeData } = useRecipeModel();

  const fetchRecipe = useCallback(async () => {
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

      setRecipeModel({
        recipe: recipe,
        price: price,
        ingredients: ingredients
      });
    } catch (e) {
      console.error("Could not fetch recipe:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <div className={`${styles.customizedDietPage} query-page`} style={{position: 'relative'}}>
      {isLoading ? (
        <RecipeLoading />
      ) : (
        <div className={`${styles.customizedDietPageQueryContainer} recipe-container`}>
          <button onClick={onClose} style={{position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}>
            &times;
          </button>
          <h1>Review your recipe</h1>
          <p>Here's a breakdown of your recipe:</p>

          {recipeModel && Object.keys(recipeModel).length > 0 && (
            <div className="slick-slide slick-current slick-active" tabIndex="0" role="tabpanel" id="slick-slide00" aria-describedby="slick-slide-control00" style={{ width: '880px' }} data-slick-index="0" aria-hidden="false">
              <div style={{ position: 'relative' }} className={`${styles.recipeCard} quiz-card-full vsp-radiobutton-selected active`} onclick1="selectrecommendedproduct(this,2298, 1,0,20, 10);" id="divQA58_3268" dbid="divQA58_3268" questionid="58" runningtext="Beef, Beef Heart, Beef Kidney, Beef Liver, Quinoa, Chia Seeds, Ground Beef Bones, Vitamins&Minerals (Salt, Patassium Chloride, Zinc Proteinate, Iron Proteinate, Vitamin E Supplement, Copper Proteinate, Manganese Proteinate, Vitamin B5 Supplement, Vitamin B3 Supplement, Vitamin B2 Supplement, Vitamin B1 Supplement, Vitamin B6 Supplement, Folic Acid, Vitamin D3 Supplement, Vitamin B12 Supplement), Ground Flaxseed, Organic Kelp, Inulin, Pumpkin, Broccoli, Tocopherols, Blueberries, Cranberries" calfactor="0" questionnaireid="9" questionname="RecommendedDiets" questionanswerid="3268" questiondisplayname="RecommendedDiets">
                <div className="vsp-easyrecipe-wrapper">
                  <div id="title_feature_div" className="vsp-easyrecipe-title celwidget" data-feature-name="title" data-csa-c-id="z8adji-3wx2qa-djoebj-mvj109" data-cel-widget="title_feature_div">

                    <div id="titleSection" className="a-section a-spacing-none">
                      <h4 initialvalue="Beef with Grains Recipe" style={{ textAlign: 'center' }} className="h4 primary ">{recipeModel?.recipe?.name}</h4>
                      <div initialvalue="$0.46 per day" style={{ color: '#d76c4e' }} className="quiz-body-text ">Price: {recipeModel?.recipe?.price}, $/lb</div>
                    </div>
                  </div>
                  <div className="vsp-easyrecipe-image quiz-card-flex-wrapper" style={{ justifyContent: 'start', marginBottom: '-20px' }}>

                  </div>
                  <div className="vsp-easyrecipe-detals" style={{ textAlign: 'left', lineHeight: '18px', textAlign: 'center' }}>
                    <div className="pie-container" style={{ width: '60%', margin: 'auto' }}>
                    <Pie
                      data={{
                        labels: recipeModel?.recipe?.ingredientNames,
                        datasets: [
                          {
                            label: 'Ingredient Content',
                            data: recipeModel?.recipe?.ingredientValues,
                            backgroundColor: recipeModel?.recipe?.ingredientNames?.map(() => {
                              let color = chroma.random();
                              while (chroma.contrast(color, "white") < 4.5) {
                                color = chroma.random();
                              }
                              return color.alpha(0.5).hex();
                            }),
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          datalabels: {
                            formatter: (value, context) => {
                              const percentage = (value / context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0) * 100).toFixed(2) + '%';
                              return `${context.chart.data.labels[context.dataIndex]} (${percentage})`;
                            },
                            color: '#2c5b5b',
                          },
                        },
                      }}
                    />
                    </div>
                    <div className='recipe-container'><p><span className={styles.recipeDescription}>{recipeModel?.recipe?.description}</span></p></div>
                    <table className={styles.nutritionalProfile} style={{ width: '80%', margin: '0 auto', textAlign: "left" }}>
                      <tbody>
                        <tr>
                          <td colSpan="2"><strong>Nutritional Profile</strong></td>
                        </tr>
                        {
                            recipeModel?.recipe?.nutrientNames?.map((nutritionName, index) => {
                              if (index < recipeModel?.recipe?.nutrientValues.length) {
                                let nutritionValue = recipeModel?.recipe?.nutrientValues[index];
                                return (
                                  <tr>
                                      <td>{nutritionName}, %</td>
                                      <td>{nutritionValue}</td>
                                  </tr>
                                )
                              }
                            })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <QueryFooter />
        </div>
      )}
    </div>
  );
}

export default ReviewRecipe;
