import React, { useState, useEffect } from 'react';
import './query-pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IngredientDetails.css';

const IngredientDetails = ({ ingredient: propIngredient, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(propIngredient?.cost || '$5.99/lb');
  const [ingredientId, setIngredientId] = useState(null);

  useEffect(() => {
    // Fetch ingredient ID based on ingredient name (replace with actual API call if needed)
    // For now, just mock the ID
    setIngredientId(123);
  }, [propIngredient]);

  console.log(propIngredient);

  // Mock ingredient data
  const mockIngredient = {
    name: 'Beef',
    description: 'High-quality beef, rich in protein and essential nutrients.',
    imageUrl: './img/protein/beef.png',
    nutrition: {
      calories: '250',
      protein: '26g',
      fat: '15g',
      carbohydrates: '0g',
      sugar: '0g',
      fiber: '0g',
    },
    price: '$5.99/lb',
  };
  const ingredient = propIngredient;

  if (!ingredient) {
    return null;
  }

  const handleModifyClick = () => {
    setIsEditing(true);
  };

 const handleSaveClick = async () => {
    try {
      const response = await fetch('https://localhost:8081/mer/customer/create/ingredient_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredientId: ingredientId,
          price: price,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving price:', error);
      // Optionally display an error message to the user
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="ingredient-details-overlay">
      <div className="ingredient-details">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="ingredient-columns">
          <div className="ingredient-left-column">
            {/* Use real images */}
            {ingredient.imageUrl && (
              <img src='./img/protein/beef.png' alt={ingredient.name} className="ingredient-image" />
            )}
            <h3>{ingredient.name}</h3>
            <p>{ingredient.description}</p>
          </div>
          <div className="ingredient-right-column">
            <h4>Nutrition Facts</h4>
            <table className="nutrition-table">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {/* Move all the logics to backend side */}
                <tr key="crudeProtein">
                  <td>"Crude Protein, %"</td>
                  <td>{ingredient?.crudeProtein || 0}</td>
                </tr>
                <tr key="crudeFat">
                  <td>"Crude Fat, %"</td>
                  <td>{ingredient?.crudeFat || 0}</td>
                </tr>
                <tr key="crudeFiber">
                  <td>"Crude Fiber, %"</td>
                  <td>{ingredient?.crudeFiber || 0}</td>
                </tr>
                <tr key="ash">
                  <td>"Ash, %"</td>
                  <td>{ingredient?.ash || 0}</td>
                </tr>
                <tr key="moisture">
                  <td>"Moisture, %"</td>
                  <td>{ingredient?.moisture || 0}</td>
                </tr>
                <tr key="ash">
                  <td>"Ash, %"</td>
                  <td>{ingredient?.ash || 0}</td>
                </tr>
                <tr key="calcium">
                  <td>"Calcium, %"</td>
                  <td>{ingredient?.calcium || 0}</td>
                </tr>
                <tr key="phosphorus">
                  <td>"Phosphorus, %"</td>
                  <td>{ingredient?.phosphorus || 0}</td>
                </tr>
                <tr key="potassium">
                  <td>"Potassium, %"</td>
                  <td>{ingredient?.potassium || 0}</td>
                </tr>
                <tr key="sodium">
                  <td>"Sodium, %"</td>
                  <td>{ingredient?.sodium || 0}</td>
                </tr>
                <tr key="magnesium">
                  <td>"Magnesium, %"</td>
                  <td>{ingredient?.magnesium || 0}</td>
                </tr>
                <tr key="iron">
                  <td>"Iron, Fe mg/kg"</td>
                  <td>{ingredient?.iron || 0}</td>
                </tr>
                <tr key="copper">
                  <td>"Copper, Cu mg/kg"</td>
                  <td>{ingredient?.copper || 0}</td>
                </tr>
                <tr key="mangnese">
                  <td>"Mangnese, Mn mg/kg"</td>
                  <td>{ingredient?.mangnese || 0}</td>
                </tr>
                <tr key="zinc">
                  <td>"Zinc, Zn mg/kg"</td>
                  <td>{ingredient?.zinc || 0}</td>
                </tr>
                <tr key="iodine">
                  <td>"Iodine, mg/kg"</td>
                  <td>{ingredient?.iodine || 0}</td>
                </tr>
                <tr key="selenium">
                  <td>"Selenium, mg/kg"</td>
                  <td>{ingredient?.selenium || 0}</td>
                </tr>
                <tr key="vitaminA">
                  <td>"Vitamin A, IU/kg"</td>
                  <td>{ingredient?.vitaminA || 0}</td>
                </tr>
                <tr key="vitaminC">
                  <td>"Vitamin C, mg/kg"</td>
                  <td>{ingredient?.vitaminC || 0}</td>
                </tr>
                <tr key="vitaminD">
                  <td>"Vitamin D, mg/kg"</td>
                  <td>{ingredient?.vitaminD || 0}</td>
                </tr>
                <tr key="vitaminE">
                  <td>"Vitamin E, mg/kg"</td>
                  <td>{ingredient?.vitaminE || 0}</td>
                </tr>
              </tbody>
            </table>
            <div className="price-container">
              Price:{'$/lb'}
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className="price-input"
                    value={price}
                    onChange={handlePriceChange}
                  />
                  <button onClick={handleSaveClick} className="price-button"><i className="bi bi-save"></i></button>
                </>
              ) : (
                <>
                  {price}
                  <button onClick={handleModifyClick} className="price-button"><i className="bi bi-pencil"></i></button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
