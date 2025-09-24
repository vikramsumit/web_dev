// components/Card.jsx
import React from 'react';
import './Card.css';

const Card = ({ title,image, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
