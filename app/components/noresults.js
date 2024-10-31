import * as React from 'react';
import '../styling/NoResults.css';  

const NoResults = () => {
  return (
    <div className="no-results-container">
      
      <video className="no-results-video" width="600" autoPlay loop muted>
        <source src="/images/noresult.mp4" type="video/mp4" />
       
      </video>
    </div>
  );
};

export default NoResults;
