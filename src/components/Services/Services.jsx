import React from 'react';
import './Services.css';

function Services({ services }) {
  return (
    <div className="services-page">
      <h2>Наши услуги</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="service-price">{service.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;