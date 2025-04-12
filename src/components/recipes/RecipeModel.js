import { useState } from 'react';

const LOCAL_STORAGE_KEY = 'recipeModelData';

const saveRecipeDataToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const loadRecipeDataFromLocalStorage = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
};

const useRecipeModel = () => {
  const [recipeDataModel, setRecipeData] = useState(loadRecipeDataFromLocalStorage());

  const saveRecipeData = (newDogData) => {
    saveRecipeDataToLocalStorage(newDogData);
  };

  return {
    recipeDataModel,
    saveRecipeData
  };
};

export default useRecipeModel;
