import React from 'react';
import './query-pages.css';
import useRecipeModel from '../recipes/RecipeModel';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import chroma from 'chroma-js';

function LeftContainer({ recipeModel }) {
  const { recipeDataModel, saveRecipeData } = useRecipeModel();
  let veggieString = '';
  let plantProteinString = '';
  let grainString = '';

  const fetchIngredients = (ingredientList, nameString) => {
    if (recipeDataModel !== undefined && recipeDataModel[ingredientList]?.length > 0) {
      let nameList = recipeDataModel[ingredientList];
      nameList.map((name, index) => {
        nameString += name["name"];
        if (index != nameList.length - 1) {
          nameString += ", ";
        }
      });
    }
    return nameString;
  };

  veggieString = fetchIngredients("veggieList", veggieString);
  plantProteinString = fetchIngredients("plantProteinList", plantProteinString);
  grainString = fetchIngredients("grainList", grainString);

  return (
    <div className="left-container">
      <h2 style={{
        fontSize: '1.5em',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'center'
      }}>Protein Analysis</h2>
      {recipeDataModel && (
        <ul style={{
          listStyleType: 'none',
          padding: 0
        }}>
          {recipeDataModel["protein"] && (
            <li key='mainProtein' style={{
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div><i className="fas fa-bone" style={{marginRight: '5px'}}></i>Main Protein: {recipeDataModel["protein"]}</div>
              <Link to="/dog-protein-choice-page" className="refresh-button">
                <i className="fas fa-sync-alt"></i>
              </Link>
            </li>
          )}
          {!!plantProteinString && plantProteinString.length > 0 && (
            <li key='plantProtein' style={{
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div><i className="fas fa-leaf" style={{marginRight: '5px'}}></i>Plant Protein: {plantProteinString}</div>
              <Link to="/dog-plant-protein-choice-page" className="refresh-button">
                <i className="fas fa-sync-alt"></i>
              </Link>
            </li>
          )}
          {!!grainString && grainString.length > 0 && (
            <li key='grain' style={{
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div><i className="fas fa-wheat" style={{marginRight: '5px'}}></i>Grains: {grainString}</div>
              <Link to="/dog-grain-choice-page" className="refresh-button">
                <i className="fas fa-sync-alt"></i>
              </Link>
            </li>
          )}
          {!!veggieString && veggieString.length > 0 && (
            <li key='veggie' style={{
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div><i className="fas fa-carrot" style={{marginRight: '5px'}}></i>Vegetables & Fruits: {veggieString}</div>
              <Link to="/dog-veggie-choice-page" className="refresh-button">
                <i className="fas fa-sync-alt"></i>
              </Link>
            </li>
          )}
        </ul>
      )}
      {recipeModel && <Pie
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
    />}
    </div>
  );
}

export default LeftContainer;
