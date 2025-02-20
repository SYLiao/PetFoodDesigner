import React, { useState, useEffect } from 'react';
import './query-pages.css';
import './regular.css';
import QueryFooter from '../footer/QueryFooter';
import ProgressBar from '../progressbar/ProgressBar';
import useDogModel from './dogModel';

function ShowCustomizedDietPage() {
  const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [recipeModel, setRecipeModel] = useState({});

  const fetchRecipe = async () => {
    try {
      console.log(dogDataModel);
      const response = await fetch('http://ec2-18-117-254-10.us-east-2.compute.amazonaws.com:8081/mer/customer/get/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogDataModel),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const recipeList = result?.data?.recipes;
      console.log(result);
      if (recipeList.length > 0) {
        setRecipeModel({
          recipe: recipeList[0], 
          dailyCalories: result?.data?.dailyCalories, 
          feedFrequency: result?.data?.dailyCalories
        });
      }
    } catch (e) {
      console.error("Could not fetch recipe:", e);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [dogDataModel]);

  return (
    <div className="query-page">
      <ProgressBar progress={51} />
      <h1>Shaw's Customized Diet</h1>
      <p>Based on what you have told us about Shaw, our nutritionist recommends the following recipes. Let Shaw know that yumminess is on the way!</p>

      {recipeModel && Object.keys(recipeModel).length > 0 && (
        <div className="slick-slide slick-current slick-active" tabIndex="0" role="tabpanel" id="slick-slide00" aria-describedby="slick-slide-control00" style={{ width: '880px' }} data-slick-index="0" aria-hidden="false">
          <div style={{ position: 'relative' }} className="quiz-card-full vsp-radiobutton-selected active" onclick1="selectrecommendedproduct(this,2298, 1,0,20, 10);" id="divQA58_3268" dbid="divQA58_3268" questionid="58" runningtext="Beef, Beef Heart, Beef Kidney, Beef Liver, Quinoa, Chia Seeds, Ground Beef Bones, Vitamins&Minerals (Salt, Patassium Chloride, Zinc Proteinate, Iron Proteinate, Vitamin E Supplement, Copper Proteinate, Manganese Proteinate, Vitamin B5 Supplement, Vitamin B3 Supplement, Vitamin B2 Supplement, Vitamin B1 Supplement, Vitamin B6 Supplement, Folic Acid, Vitamin D3 Supplement, Vitamin B12 Supplement), Ground Flaxseed, Organic Kelp, Inulin, Pumpkin, Broccoli, Tocopherols, Blueberries, Cranberries" calfactor="0" questionnaireid="9" questionname="RecommendedDiets" questionanswerid="3268" questiondisplayname="RecommendedDiets">
            <div className="vsp-easyrecipe-wrapper">
              <div id="title_feature_div" className="vsp-easyrecipe-title celwidget" data-feature-name="title" data-csa-c-id="z8adji-3wx2qa-djoebj-mvj109" data-cel-widget="title_feature_div">

                <div id="titleSection" className="a-section a-spacing-none">
                  <h4 initialvalue="Beef with Grains Recipe" style={{ textAlign: 'center' }} className="h4 primary ">{recipeModel?.recipe?.name}</h4>
                  <div initialvalue="$0.46 per day" style={{ color: '#d76c4e' }} className="quiz-body-text ">DailyCalories: {recipeModel.dailyCalories}</div>
                </div>
              </div>
              <div className="vsp-easyrecipe-image quiz-card-flex-wrapper" style={{ justifyContent: 'start', marginBottom: '-20px' }}>
                
              </div>
              <div className="vsp-easyrecipe-detals" style={{ textAlign: 'left', lineHeight: '18px', textAlign: 'center' }}>
              <img className="quiz-card-image hide-mobile-NOTUSED" src="./img/recipe/chicken.png" style={{ justifyContent: 'start'}} />
              <div className='recipe-container'><p><span>{recipeModel?.recipe?.description}</span></p></div>
                <table style={{ width: '80%', margin: '0 auto', textAlign: "left" }}>
                  <tbody>
                    <tr>
                      <td colSpan="2"><strong>Nutritional Profile</strong></td>
                    </tr>
                    <tr>
                      <td>ME content, Kcal/kg</td>
                      <td>{recipeModel?.recipe?.caloriesPerKg}</td>
                    </tr>
                    <tr>
                      <td>Crude Protein, %</td>
                      <td>{recipeModel?.recipe?.crudeProtein}</td>
                    </tr>
                    <tr>
                      <td>Crude Fat, %</td>
                      <td>{recipeModel?.recipe?.crudeFat}</td>
                    </tr>
                    <tr>
                      <td>Crude Fiber, %</td>
                      <td>{recipeModel?.recipe?.crudeFiber}</td>
                    </tr>
                    <tr>
                      <td>Moisture, %</td>
                      <td>{recipeModel?.recipe?.moisture}</td>
                    </tr>
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
          </div>
        </div>
      )}

      <QueryFooter />
      </div>
  );
}

export default ShowCustomizedDietPage;
