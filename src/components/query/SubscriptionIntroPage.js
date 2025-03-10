import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './query-pages.css';
import QueryFooter from '../footer/QueryFooter';
import useDogModel from './dogModel';
import ProgressBar from '../progressbar/ProgressBar';

function SubscriptionIntroPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { dogData, loading, error, fetchDogData } = useDogModel();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="query-page">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <ProgressBar progress={5} />
          <h1>Let’s build your dog’s perfect plan!</h1>
          <p>Over the next few steps, we’ll ask you some questions about your dog. Then, we’ll create a personalized meal plan just for them!</p>
          <p>Get started now and see your dog’s unique plan!</p>

          {loading && <p>Loading dog data...</p>}
          {error && <p>Error fetching dog data: {error.message}</p>}
          {dogData && (
            <div>
              <h3>Dog Data Preview:</h3>
              <p>Name: {dogData.name}</p>
              <p>Breed: {dogData.breed}</p>
            </div>
          )}

          <Link to="/dog-name-form" className="page-button">Next</Link>
          <QueryFooter />
        </div>
      )}
    </div>
  );
}

export default SubscriptionIntroPage;
