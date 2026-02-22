import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <h1>Доступ запрещён</h1>
        <p>У вас недостаточно прав для просмотра этой страницы.</p>
        <div className="unauthorized-actions">
          <Link to="/" className="btn-primary">На главную</Link>
          <Link to="/reviews" className="btn-secondary">Оставить отзыв</Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;