import React from 'react';
import './BarkinBeefPage.css';

function BarkinBeefPage() {
  return (
    <div className="barkin-beef-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="recipe-name">Barkin' Beef</h1>
          <p className="recipe-subtitle">Lean Ground Beef Recipe</p>
          <button className="button customize-button">Customize Your Plan</button>
        </div>
        <div className="hero-image">
          <img src="/images/barkin-beef-hero.png" alt="PetPlate Barkin' Beef Recipe" />
        </div>
      </section>

      {/* Recipe Details Section */}
      <section className="recipe-details">
        <div className="recipe-highlights">
          <h2>Recipe Highlights</h2>
          <ul className="highlights-list">
            <li>
              <img src="/icons/real-beef.svg" alt="Real Beef" className="highlight-icon" />
              Real USDA Beef
            </li>
            <li>
              <img src="/icons/human-grade.svg" alt="Human Grade" className="highlight-icon" />
              Human Grade
            </li>
            <li>
              <img src="/icons/vet-designed.svg" alt="Vet Designed" className="highlight-icon" />
              Vet-Designed
            </li>
            <li>
              <img src="/icons/freshly-cooked.svg" alt="Freshly Cooked" className="highlight-icon" />
              Freshly Cooked
            </li>
          </ul>
        </div>

        <div className="ingredients-section">
          <h2>Key Ingredients</h2>
          <ul className="ingredient-list">
            <li>Ground Beef</li>
            <li>Beef Liver</li>
            <li>Sweet Potatoes</li>
            <li>Carrots</li>
            <li>Apples</li>
            <li>Pumpkin</li>
            <li>...and more wholesome ingredients</li>
          </ul>
          <button className="button ingredient-button">View Full Ingredient List</button>
        </div>
      </section>

      {/* Guaranteed Analysis Section */}
      <section className="guaranteed-analysis">
        <h2>Guaranteed Analysis</h2>
        <div className="analysis-table-container">
          <table className="analysis-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Crude Protein (min)</td>
                <td>9.5%</td>
              </tr>
              <tr>
                <td>Crude Fat (min)</td>
                <td>7.0%</td>
              </tr>
              <tr>
                <td>Crude Fiber (max)</td>
                <td>1.5%</td>
              </tr>
              <tr>
                <td>Moisture (max)</td>
                <td>78.0%</td>
              </tr>
              <tr>
                <td>Omega-6 Fatty Acids* (min)</td>
                <td>0.7%</td>
              </tr>
              <tr>
                <td>Omega-3 Fatty Acids* (min)</td>
                <td>0.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="analysis-disclaimer">*(Not recognized as an essential nutrient by the AAFCO Dog Food Nutrient Profiles. )</p>
      </section>

      {/* Calorie Content Section */}
      <section className="calorie-content">
        <h2>Calorie Content</h2>
        <p>(ME Calculated) 1404 kcal/kg, 398 kcal/cup</p>
        <p className="calorie-disclaimer">PetPlate Barkin' Beef Recipe is formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles for adult maintenance.</p>
      </section>

      {/* Feeding Instructions Section */}
      <section className="feeding-instructions">
        <h2>Feeding Instructions</h2>
        <div className="feeding-text">
          <p>Every PetPlate meal is freshly-cooked and pre-portioned, making feeding time a breeze! Just open the container and serve. No scooping, no mess. For pups who prefer warm food, gently heat in a microwave-safe dish.</p>
          <p>Transitioning to PetPlate? Gradually introduce PetPlate over 7-10 days, mixing increasing amounts of PetPlate with your dog's current food. Always ensure fresh water is available.</p>
        </div>
        <button className="button customize-button">Customize Your Plan</button>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews">
        <h2>What Pet Parents are Saying</h2>
        <div className="review-container">
          <p className="no-reviews">No reviews yet. Be the first to review Barkin' Beef!</p>
        </div>
      </section>
    </div>
  );
}

export default BarkinBeefPage;
