import React from 'react';
import './QueryFooter.css'; // Import CSS
import { Link } from 'react-router-dom';

function QueryFooter({ back, next, saveDogData, dogData }) {
  const handleSaveProgress = () => {
    saveDogData(dogData);
  };

  return (
    <footer className="query-footer">
      <div className="footer-buttons-left">
        <button className="footer-button back-button" onClick={handleSaveProgress}>
        {back && <div><i className="bi bi-arrow-left"></i>
           <Link to={back}> Back</Link></div>}
        </button>
      </div>
      <div className="footer-buttons-center">
        <button className="footer-button save-button" onClick={handleSaveProgress}>
          <i className="bi bi-save"></i> Save Progress
        </button>
      </div>
      <div className="footer-buttons-right">
        <button className="footer-button next-button" onClick={handleSaveProgress}>
        {next && <div><Link to={next}> Next</Link>
          <i className="bi bi-arrow-right"></i></div>}
        </button>
      </div>
    </footer>
  );
}

export default QueryFooter;
