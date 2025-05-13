import React from 'react'
import cat from '../assets/cat0.png';

const Card = () => {
  return (
    <div className="Card" > 
      <img src={cat} className="card-img-top" alt="cat" width="800" height="300" ></img>
      <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
  </div>
      </div>
  )
}

export default Card