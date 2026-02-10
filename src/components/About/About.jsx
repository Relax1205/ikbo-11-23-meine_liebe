import React from 'react';
import './About.css';

function About({ title, description, imageUrl }) {
  return (
    <div className="about-page">
      <h2>{title}</h2>
      <div className="about-content">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default About;