import React from 'react';
import carImage from './truck.gif'; 
import './animations.css'; 

function Animations() {
  return (
    <div className="Animations">
      <img src={carImage} className="moving-car" alt="moving car" />
    </div>
  );
}

export default Animations;
