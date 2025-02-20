import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './static/styles.css';
import Header from './components/header/Header';
import BarkinBeefPage from './components/recipes/BarkinBeefPage';
import SubscriptionIntroPage from './components/query/SubscriptionIntroPage';
import DogNameFormPage from './components/query/DogNameFormPage'; // Import DogNameFormPage
import DogBreedPage from './components/query/DogBreedPage';
import DogAgePage from './components/query/DogAgePage'; // Import DogAgePage
import DogGenderPage from './components/query/DogGenderPage';
import DogWeightPage from './components/query/DogWeightPage'; // Import DogWeightPage
import DogBodyConditionPage from './components/query/DogBodyConditionPage';
import DogTreatPage from './components/query/DogTreatPage';
import DogActiveLevelPage from './components/query/DogActiveLevelPage';
import DogHealthIssuesPage from './components/query/DogHealthIssuesPage';
import DogProteinChoicePage from './components/query/DogProteinChoicePage';
import ShowCustomizedDietPage from './components/query/ShowCustomizedDietPage';

const navLinks = [
  { text: 'Home', href: '/' },
  {
    text: 'Recipes',
    href: '/recipes',
    dropdown: [
      { text: 'Barkin\' Beef', href: '/entree/beef' },
    ],
  },
  { text: 'About Us', href: '/about' },
  { text: 'Get Started', href: '/subscription' },
];

function HomePage() {
  return (
    <main className="main">
      <section className="hero-section">
        <h2>Fresh-cooked food, delivered to your door.</h2>
        <p>Real ingredients, healthy recipes, happy dogs.</p>
        <Link to="/subscription">
          <button>Get Started</button>
        </Link>
      </section>

      <section className="feature-section">
        <div className="feature-box">
          <h3>Why Choose PetPlate?</h3>
          <p>We use only the highest quality, human-grade ingredients in our meals.</p>
        </div>
        <div className="feature-box">
          <h3>Our Promise</h3>
          <p>To provide your dog with healthy, delicious, and nutritious meals they'll love.</p>
        </div>
      </section>

      <section className="review-section">
        <h2>Customer Reviews</h2>
        <div className="review-container">
          <div className="review-box">
            <p className="quote">"My dog absolutely loves PetPlate! He's never been so excited for meal times."</p>
            <p className="author">- Happy Dog Owner</p>
          </div>
          <div className="review-box">
            <p className="quote">"Since switching to PetPlate, my dog's digestion has improved and he has so much more energy!"</p>
            <p className="author">- Another Happy Owner</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
      <div>
        <Header navLinks={navLinks} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/entree/beef" element={<BarkinBeefPage />} />
          <Route path="/subscription" element={<SubscriptionIntroPage />} />
          <Route path="/dog-name-form" element={<DogNameFormPage />} />
          <Route path="/dog-age-form" element={<DogAgePage />} /> {/* Add route for DogAgePage */}
          <Route path="/dog-breed-form" element={<DogBreedPage />} />
          <Route path="/dog-gender-form" element={<DogGenderPage />} />
          <Route path="/dog-weight-form" element={<DogWeightPage />} /> {/* Add route for DogWeightPage */}
          <Route path="/dog-body-condition-form" element={<DogBodyConditionPage />} />
          <Route path="/dog-active-level-form" element={<DogActiveLevelPage />} />
          <Route path="/dog-treat-form" element={<DogTreatPage />} />
          <Route path="/dog-health-issues-form" element={<DogHealthIssuesPage />} />
          <Route path="/dog-protein-choice-form" element={<DogProteinChoicePage />} />
          <Route path="/show-customized-diet" element={<ShowCustomizedDietPage />} />
        </Routes>
      </div>
  );
}

export default App;
