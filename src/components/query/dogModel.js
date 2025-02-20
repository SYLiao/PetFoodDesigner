import { useState } from 'react';

const LOCAL_STORAGE_KEY = 'dogModelData';

const saveDogDataToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const loadDogDataFromLocalStorage = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
};

const useDogModel = () => {
  const [dogDataModel, setDogData] = useState(loadDogDataFromLocalStorage());

  const saveDogData = (newDogData) => {
    saveDogDataToLocalStorage(newDogData);
  };

  return {
    dogDataModel,
    saveDogData
  };
};

export default useDogModel;
