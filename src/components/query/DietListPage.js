import React from 'react';
import { Link } from 'react-router-dom';
import './query-pages.css';
import './DietListPage.css';

function DietListPage() {
  const diets = [
    { id: 1, name: "Chicken Diet", description: "A diet based on chicken.", dailyCalories: 500 },
    { id: 2, name: "Beef Diet", description: "A diet based on beef.", dailyCalories: 600 },
    { id: 3, name: "Fish Diet", description: "A diet based on fish.", dailyCalories: 450 }
  ];

  return (
    <div className="diet-list-page query-page">
      <div className='query-container'>
        <h1>My Diets</h1>
        <ul className="diet-list">
          {diets.map(diet => (
            <li key={diet.id} className="diet-item">
              <Link to={`/diet/${diet.id}`} className="diet-link">
                <h2 className="diet-name">{diet.name}</h2>
                <p className="diet-description">{diet.description}</p>
                <p className="diet-calories">Daily Calories: {diet.dailyCalories}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DietListPage;
