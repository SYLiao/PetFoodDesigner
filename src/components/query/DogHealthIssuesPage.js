import React, { useState } from 'react';
import ProgressBar from '../progressbar/ProgressBar';
import QueryFooter from '../footer/QueryFooter';
import './query-pages.css';
import useDogModel from './dogModel';

function DogHealthIssuesPage() {
  const healthIssueOptions = [
    { id:1, name: 'Poor Digestive Performance', image: '/images/beef.jpg' },
    { id:2, name: 'Poor Skin & Coat', image: '/images/chicken.jpg' },
    { id:3, name: 'Allergy', image: '/images/lamb.jpg' },
    { id:4, name: 'Anxiety', image: '/images/pork.jpg' },
    { id:5, name: 'Urinary & Kidney issues', image: '/images/salmon.jpg' },
    { id:6, name: 'Heart & Liver Dysfunction', image: '/images/veggie.jpg' },
    { id:7, name: 'Dental Issues', image: '/images/veggie.jpg' },
    { id:8, name: 'Weak Immunity', image: '/images/veggie.jpg' },
  ];
  const healthIssueList = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

	const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var hasHealthIssue = dogData?.hasHealthIssue || false;
  let healthIssueSelected = dogData?.healthIssueSelected || healthIssueList;

  const handleHasHealthIssueChange = () => {
    setDogData({...dogData, hasHealthIssue: true});
	  hasHealthIssue = true;
  };

  const handleNoHealthIssueChange = () => {
    setDogData({...dogData, hasHealthIssue: false});
	  hasHealthIssue = false;
  };

  const handleHealthIssueChange = (checkedHealthIssueId) => {
    console.log(checkedHealthIssueId);
    if (checkedHealthIssueId < healthIssueSelected.length) {
      healthIssueSelected[checkedHealthIssueId - 1] = !healthIssueSelected[checkedHealthIssueId - 1];
      setDogData({...dogData, healthIssueSelected: healthIssueSelected});
    }
  };

  const isHealthIssueChecked = (healthIssueId) => {
    console.log(healthIssueId);
    
    if (healthIssueId < healthIssueSelected.length) {
      return healthIssueSelected[healthIssueId - 1] === true;
    }
    return false;
  };

  const saveChange = (dogData) => {
    saveDogData(dogData);
  };

  return (
    <div className="query-page">
      <ProgressBar progress={35} />
      <h1>Does {dogDataModel?.name} have any health or digestive issues?</h1>
      <div className="query-page-options">
        <label>
          <input
            type="radio"
            name="healthIssues"
            value="no"
            className="query-page-option-button"
            checked={!hasHealthIssue}
            onChange={handleNoHealthIssueChange}
          />
          No
        </label>
        <label>
          <input
            type="radio"
            name="healthIssues"
            value="yes"
            className="query-page-option-button"
            checked={hasHealthIssue}
            onChange={handleHasHealthIssueChange}
          />
          Yes
        </label>
      </div>

      {hasHealthIssue && (
        <div className="health-issues-container">
          <p>Choose all that apply</p>
          <div className="health-issues-options" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {healthIssueOptions.map((healthIssueOption) => (
            <div style={{ width: '50%' }} onClick={() => handleHealthIssueChange(healthIssueOption.id)}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="healthIssue" value="Poor Digestive Performance" checked={healthIssueOption.id <healthIssueSelected.length && healthIssueSelected[healthIssueOption.id - 1] === true}/>
              {healthIssueOption.name}
            </label>
          </div>
          ))}
          </div>
        </div>
      )}
      <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-treat-form"} next={"/dog-protein-choice-form"}/>
    </div>
  );
}

export default DogHealthIssuesPage;
