import React, {useState} from 'react';
import './query-pages.css';
import QueryFooter from '../footer/QueryFooter';
import ProgressBar from '../progressbar/ProgressBar';
import useDogModel from './dogModel';

function DogAgePage() {
  const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  console.log(dogDataModel);

  const handleYearChange = (event) => {
    setDogData({...dogData, year: event.target.value});
  };

  const handleMonthChange = (event) => {
    setDogData({...dogData, month: event.target.value});
  };

  const saveAgeChange = (dogData) => {
    console.log(dogDataModel);
    console.log(dogData);
    saveDogData(dogData);
  };

  return (
    <div className="query-page">
      <ProgressBar progress={6} />
      <h1>How old is {dogDataModel?.name}?</h1>
      <p className="subtitle">From puppy to senior, your dog’s age helps determine the vitamins and nutrients they need to live their best life.</p>
      <p className="light-text">Enter their current age below</p>
      <div className="input-group">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label htmlFor="years" style={{ marginRight: '10px', paddingBottom: '20px'}}>Years</label>
            <input type="number" id="years" placeholder="0" className="age-input" style={{ width: '60px' }} value={dogData?.year || ''} onChange={handleYearChange} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="months" style={{ marginRight: '10px', paddingBottom: '20px'}}>Months</label>
            <input type="number" id="months" placeholder="0" className="age-input" style={{ width: '60px' }} value={dogData?.month || ''} onChange={handleMonthChange} />
          </div>
        </div>
      </div>
      <QueryFooter saveDogData={saveAgeChange} dogData={dogData} back={"/dog-name-form"} next={"/dog-breed-form"}/>
    </div>
  );
}

export default DogAgePage;
