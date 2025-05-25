import React from 'react';
import cardImg from '../assets/cat0.png';

const Card = () => {
  return (
<div className="card" style={{maxWidth: '200px'}}>
  <img src={cardImg} className="card-img-top" alt="cardImg"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the </p>
  </div>
</div>
  )
}

export default Card